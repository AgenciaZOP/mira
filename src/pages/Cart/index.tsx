import { Avatar, IconButton, Menu, MenuItem } from "@mui/material"
import React, { useEffect, useState } from "react"
import "./style.scss"
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner"
import { useNavigate } from "react-router-dom"
import { useProducts } from "../../hooks/useProducts"
import { Product } from "./Product"
import { useCart } from "../../hooks/useCart"
import { useUser } from "../../hooks/useUser"

interface CartProps {}

export const Cart: React.FC<CartProps> = ({}) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const [open, setOpen] = useState(Boolean(anchorEl))

    const navigate = useNavigate()
    const { cart } = useCart()
    const { logout } = useUser()

    const icon_style = { color: "white", height: "10vw", width: "10vw" }

    const handleClose = () => {
        setAnchorEl(null)
    }

    useEffect(() => {
        setOpen(Boolean(anchorEl))
    }, [anchorEl])

    return (
        <div className="Cart-Page">
            <div className="title-container">
                <IconButton onClick={(event) => setAnchorEl(event.currentTarget)}>
                    <Avatar sx={icon_style} />
                </IconButton>
                <h2>Carrinho</h2>
                <IconButton onClick={() => navigate("/scan")}>
                    <QrCodeScannerIcon sx={icon_style} />
                </IconButton>
            </div>
            <div className="product-list">
                {cart.map((product) => (
                    <Product key={product.id} product={product} />
                ))}
            </div>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
            >
                <MenuItem onClick={handleClose}>Perfil</MenuItem>
                <MenuItem onClick={logout}>Sair</MenuItem>
            </Menu>
        </div>
    )
}
