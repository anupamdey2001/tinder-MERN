import Nav from "../Components/Nav";
import AuthModal from "../Components/AuthModal";
import { useState } from "react";
import { useCookies } from "react-cookie";
const Home = () => {
    const [showModal, setShowModal] = useState(false);
    const [isSignUp, setIsSignUp] = useState(true);
    const [cookie, setCookie, removeCookie] = useCookies(['user']);
    const authToken = cookie.AuthToken;
    const handleClick = () => {
        if (authToken) {
            removeCookie('UserId', cookie.UserId)
            removeCookie('AuthToken', cookie.AuthToken)
            window.location.reload()
            return;
        }
        console.log("clicked");
        setShowModal(true);
        setIsSignUp(true);
    }
    return (
        <div className="overlay">
            <Nav
                authToken={authToken}
                minimal={false}
                setShowModal={setShowModal}
                showModal={showModal}
                setIsSignUp={setIsSignUp}
            />

            <div className="home">
                <h1 className="primary-title">Swipe RightⓇ</h1>
                <button className="primary-button" onClick={handleClick}>{authToken ? "Sign out" : "Create Account"}</button>
                {showModal && (<AuthModal setShowModal={setShowModal} isSignUp={isSignUp} />)}
            </div>
        </div>
    )
}

export default Home