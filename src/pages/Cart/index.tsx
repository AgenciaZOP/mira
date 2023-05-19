import "./style.scss"
import { Button, IconButton } from "@mui/material"
import { ReactComponent as AvatarIcon } from "../../images/avatar_icon.svg"
import { ReactComponent as LittleArrowDown } from "../../images/little_arrow_down.svg"
import { ReactComponent as QrCodePlusIcon } from "../../images/qrcode_plus_icon.svg"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useProducts } from "../../hooks/useProducts"
import { Product } from "./Product"
import { useCart } from "../../hooks/useCart"
import { useUser } from "../../hooks/useUser"
import { useLocalStorage } from "../../hooks/useLocalStorage"
import { TutorialMask } from "../../components/TutorialMask"
import { FinishContainer } from "./FinishContainer"
import { Menu } from "../../components/Menu"

interface CartProps {}

export const Cart: React.FC<CartProps> = ({}) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const openMenu = Boolean(anchorEl)

    const navigate = useNavigate()
    const { cart } = useCart()

    const storage = useLocalStorage()
    const [tutorial, setTutorial] = useState(false)

    const icon_style = { color: "white", height: "10vw", width: "10vw" }
    const button_style = { padding: "0" }

    const handleCloseMenu = () => {
        setAnchorEl(null)
    }

    useEffect(() => {
        const has_accessed = storage.get("has_accessed")
        if (has_accessed) {
            console.log("acessou")
        } else {
            console.log("nao")
            setTutorial(true)
        }
    }, [])

    return (
        <div className="Cart-Page">
            <div className="title-container">
                <IconButton onClick={(event) => setAnchorEl(event.currentTarget)} style={button_style} >
                    <AvatarIcon style={{ marginLeft: "-1vw", width: "10vw" }} />
                    <LittleArrowDown style={{ position: "absolute", bottom: "1vw", right: "0.5vw",  width: "4vw" }} />
                </IconButton>
                <h2>Carrinho</h2>
                <IconButton onClick={() => navigate("/scan")} style={button_style} >
                    <QrCodePlusIcon style={icon_style} />
                </IconButton>
            </div>

            {tutorial && <TutorialMask />}

            <div className="product-list">
                {cart.map((product) => (
                    <Product key={product.id} product={product} />
                ))}
            </div>

            <FinishContainer />
            <Menu open={openMenu} anchorEl={anchorEl} handleClose={handleCloseMenu} />
        </div>
    )
}
