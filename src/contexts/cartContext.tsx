import { createContext, useEffect, useState } from "react"
import React from "react"
import { Cart } from "../definitions/cart"
import { useLocalStorage } from "../hooks/useLocalStorage"

interface CartContextValue {
    value: Cart[]
    setValue: (value: Cart[]) => void
}

interface CartProviderProps {
    children: React.ReactNode
}

const CartContext = createContext<CartContextValue>({} as CartContextValue)

export default CartContext

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const storage = useLocalStorage()
    const [value, setValue] = useState<Cart[]>(storage.get("mira.cart") || [])

    useEffect(() => {
        storage.set("mira.cart", value)
        console.log({ cart: value })
    }, [value])

    return <CartContext.Provider value={{ value, setValue }}>{children}</CartContext.Provider>
}
