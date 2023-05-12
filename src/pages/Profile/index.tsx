import React, { useEffect } from "react"
import { Route, Routes, useNavigate } from "react-router-dom"
import { useUser } from "../../hooks/useUser"
import { Account } from "./Account"
import { Header } from "./Header.index"
import "./style.scss"
import { useSnackbar } from "../../hooks/useSnackbar"
import { Address } from "./Address"

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
                {user && (
                    <Routes>
                        <Route path="/account" element={<Account user={user} />} />
                        <Route path="/address" element={<Address user={user} />} />
                    </Routes>
                )}
            </div>
        </div>
    )
}
