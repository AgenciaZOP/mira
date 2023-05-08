import React, { useState } from "react"
import "./style.scss"
import { ReactComponent as Logo } from "../../images/logo.svg"
import { ReactComponent as BackgroundElement } from "../../images/background_element.svg"
import { LoginForm } from "./LoginForm"
import { SignupForm } from "./SignupForm"
import { useColors } from "../../hooks/useColors"

interface LoginProps {}

export const Login: React.FC<LoginProps> = ({}) => {
    const [loginView, setLoginView] = useState(true)
    const [isSignUp, setIsSignUp] = useState(false)

    const colors = useColors()

    const toggleForms = () => {
        setIsSignUp(!isSignUp)
    }

    return (
        <div className="Login-Page">
            {/* <BackgroundElement
                className={`background-element ${isSignUp ? "bigger" : ""}`}
                style={{
                    position: "absolute",
                    width: "100vw",
                    top: "30vh",
                }}
            /> */}
            <div className="form-container">
                <Logo style={{ width: "60vw", flexShrink: 0 }} />
                <LoginForm onSwitch={toggleForms} />
            </div>
        </div>
    )
}
