import "./style.scss"
import { ReactComponent as RectangularTutorialFocus } from "../../images/rectangular_tutorial_focus.svg"
import { ReactComponent as Balloon2 } from "../../images/balloon2.svg"
import { ReactComponent as AvatarBG } from "../../images/avatar_bg.svg"
import { useNavigate } from "react-router-dom"
import { useLocalStorage } from "../../hooks/useLocalStorage"
import avatarWebp from "../../../src/images/mira_avatar.webp"

export const SimilarItemsTutorialMask = () => {
    const navigate = useNavigate()
    const storage = useLocalStorage()

    const focus_style: React.CSSProperties = {
        top: "1vw",
        left: "1vw",
    }

    const completeSimilarItemsTutorial = () => {
        navigate("/scan")
        storage.set("mira.seen_similar_items_tutorial", true)
    }

    return (
        storage.get("mira.seen_similar_items_tutorial") ? null :
        <div className="similar_items_tutorial-mask" onClick={completeSimilarItemsTutorial} >
            <RectangularTutorialFocus style={focus_style} className="focus"/>
            <div className="balloon-container">
                <Balloon2 className="balloon" />
                <div className="balloon-text">
                    <p>
                        Caso queira ver produtos similares, basta clicar no botão indicado!
                    </p>
                </div>
            </div>
            <img className="avatar" src={avatarWebp} alt="" />
            <AvatarBG className="avatar-bg" />
        </div>
    )
}