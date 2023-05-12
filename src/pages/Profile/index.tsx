import React, { useEffect } from "react"
import { Route, Routes, useNavigate } from "react-router-dom"
import { useUser } from "../../hooks/useUser"
import { Account } from "./Account"
import { Header } from "./Header.index"
import "./style.scss"

interface ProfileProps {}

export const Profile: React.FC<ProfileProps> = ({}) => {
    const { user } = useUser()
    const navigate = useNavigate()

    useEffect(() => {
        if (!user) navigate("/login")
    }, [])

    return (
        <div className="Profile-Page">
            <div className="main-container">
                <Header />
                <Routes>
                    <Route path="/account" element={<Account />} />
                </Routes>
            </div>
        </div>
    )
}
