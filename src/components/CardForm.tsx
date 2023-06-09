import React, { useState, useEffect } from "react"
import { Card, User } from "../definitions/user"
import { useColors } from "../hooks/useColors"
import { useApi } from "../hooks/useApi"
import { useUser } from "../hooks/useUser"
import { useNavigate } from "react-router-dom"
import { useSnackbar } from "../hooks/useSnackbar"
import { Form, Formik } from "formik"
import { FormControlLabel, Radio, RadioGroup } from "@mui/material"
import { TextField } from "./TextField"
import MaskedInput from "react-text-mask"
import { useCardNumberMask } from "../hooks/useCardNumberMask"
import { useNumberMask } from "../hooks/useNumberMask"
import useMeasure, { RectReadOnly } from "react-use-measure"

interface CardFormProps {
    user: User
    values: {
        cardType: string
        cardOwner: string
        cardNumber: string
        cardMonth: string
        cardYear: string
        cardCvv: string
    }
    setValues: {
        setCardType: (value: string) => void
        setCardOwner: (value: string) => void
        setCardNumber: (value: string) => void
        setCardMonth: (value: string) => void
        setCardYear: (value: string) => void
        setCardCvv: (value: string) => void
        setCardError: (value: boolean) => void
    },
    chooseAttributes: RectReadOnly
    paymentAttributes: RectReadOnly
}

export const CardForm: React.FC<CardFormProps> = ({ user, values, setValues, chooseAttributes, paymentAttributes }) => {
    const [cardNumberError, setCardNumberError] = useState("")
    const [cardCvvError, setCardCvvError] = useState("")
    const [cardMonthError, setCardMonthError] = useState("")
    const [cardYearError, setCardYearError] = useState("")

    const [cardRef, { height }] = useMeasure()

    // console.log(paymentAttributes)
    // console.log(chooseAttributes)

    const available_height = paymentAttributes.height - chooseAttributes.height

    const colors = useColors()
    const api = useApi()
    const { setUser } = useUser()
    const navigate = useNavigate()
    const { snackbar } = useSnackbar()
    const cardNumberMask = useCardNumberMask()
    const numberMask = useNumberMask(2, true)
    const threeNumberMask = useNumberMask(3)
    const fourNumberMask = useNumberMask(4, false, "")

    const radio_style = {
        "&.Mui-checked": {
            backgroundColor: colors.purple,
            color: "#9AF82E",
        },
        color: "#EBEBEB",
        backgroundColor: colors.light_grey,
        padding: 0,
        boxShadow: "2px 3px 0px #1A7FB7",
        borderRadius: "50%",
        marginRight: "2vw",
    }

    const handleCardNumberBlur: React.FocusEventHandler<HTMLInputElement> = (event) => {
        if (event.target.value.length < 19) {
            setCardNumberError("Número de cartão inválido")
        } else {
            setCardNumberError("")
        }
    }

    const handleCardCvvBlur: React.FocusEventHandler<HTMLInputElement> = (event) => {
        if (event.target.value.length < 3) {
            setCardCvvError("CVV inválido")
        } else {
            setCardCvvError("")
        }
    }

    const handleCardYearBlur: React.FocusEventHandler<HTMLInputElement> = (event) => {
        if (event.target.value.length < 4) {
            setCardYearError("Ano inválido")
        } else {
            setCardYearError("")
        }
    }

    const handleCardMonthBlur: React.FocusEventHandler<HTMLInputElement> = (event) => {
        if (Number(event.target.value) > 12) {
            setCardMonthError("Mês inválido")
        } else {
            setCardMonthError("")
        }
    }

    useEffect(() => {
        if (!(values.cardCvv && values.cardMonth && values.cardNumber && values.cardOwner && values.cardYear)) {
            setValues.setCardError(true)
        } else {
            if (values.cardCvv.length != 3) {
                setValues.setCardError(true)
            } else if (values.cardYear.length != 4) {
                setValues.setCardError(true)
            } else {
                if (Number(values.cardMonth) > 12 || Number(values.cardNumber) < 1) {
                    console.log(Number(values.cardMonth))
                    setValues.setCardError(true)
                } else {
                    if (values.cardNumber.length != 19) {
                        setValues.setCardError(true)
                    } else setValues.setCardError(false)
                }
            }
        }
    }, [values])

    return (
        <div
            className="CardForm-Component"
            ref={cardRef}
            style={{ height: available_height > height ? available_height : height }}
        >
            <div className="type-container">
                <RadioGroup
                    value={values.cardType}
                    name="type"
                    onChange={(_, value) => setValues.setCardType(value)}
                    sx={{ flexDirection: "row", gap: "10vw" }}
                >
                    <FormControlLabel
                        value="credit"
                        sx={{ marginLeft: "0" }}
                        control={<Radio sx={radio_style} />}
                        label="Crédito"
                    />
                    <FormControlLabel
                        value="debit"
                        sx={{ marginLeft: "0" }}
                        control={<Radio sx={radio_style} />}
                        label="Débito"
                    />
                </RadioGroup>
            </div>

            <TextField
                placeholder="Nome registrado no cartão"
                name="name"
                value={values.cardOwner}
                onChange={(event) => setValues.setCardOwner(event.target.value)}
            />
            <MaskedInput
                mask={cardNumberMask}
                guide={false}
                name="number"
                value={values.cardNumber}
                onChange={(event) => setValues.setCardNumber(event.target.value)}
                onBlur={handleCardNumberBlur}
                render={(ref, props) => (
                    <TextField
                        inputRef={ref}
                        {...props}
                        placeholder="Número do cartão"
                        inputProps={{ inputMode: "numeric" }}
                        error={!!cardNumberError}
                        helperText={cardNumberError}
                    />
                )}
            />

            <h2>Data de expiração</h2>
            <div className="expiration-container">
                <MaskedInput
                    mask={numberMask}
                    guide={false}
                    name="expiration_month"
                    value={values.cardMonth}
                    onChange={(event) => setValues.setCardMonth(event.target.value)}
                    onBlur={handleCardMonthBlur}
                    render={(ref, props) => (
                        <TextField
                            inputRef={ref}
                            {...props}
                            placeholder="Mês"
                            error={!!cardMonthError}
                            helperText={cardMonthError}
                            inputProps={{ inputMode: "numeric" }}
                        />
                    )}
                />
                <MaskedInput
                    mask={fourNumberMask}
                    guide={false}
                    name="expiration_year"
                    value={values.cardYear}
                    onBlur={handleCardYearBlur}
                    onChange={(event) => setValues.setCardYear(event.target.value)}
                    render={(ref, props) => (
                        <TextField
                            inputRef={ref}
                            {...props}
                            placeholder="Ano"
                            error={!!cardYearError}
                            helperText={cardYearError}
                            inputProps={{ inputMode: "numeric" }}
                        />
                    )}
                />
                <MaskedInput
                    mask={threeNumberMask}
                    guide={false}
                    name="cvv"
                    value={values.cardCvv}
                    onChange={(event) => setValues.setCardCvv(event.target.value)}
                    onBlur={handleCardCvvBlur}
                    render={(ref, props) => (
                        <TextField
                            inputRef={ref}
                            {...props}
                            placeholder="CVV"
                            error={!!cardCvvError}
                            helperText={cardCvvError}
                            inputProps={{ inputMode: "numeric" }}
                        />
                    )}
                />
            </div>
        </div>
    )
}
