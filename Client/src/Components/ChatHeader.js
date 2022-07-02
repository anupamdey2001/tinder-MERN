import { useCookies } from 'react-cookie'

const ChatHeader = ({ user }) => {

    const [cookie, setCookies, removeCookies] = useCookies(null);

    const logout = () => {
        removeCookies('UserId', cookie.UserId)
        removeCookies('AuthToken', cookie.AuthToken)
        window.location.reload();
    }
    return (
        <div className='chat-container-header'>
            <div className="profile">
                <div className='img-container'>
                    <img src={user.url} alt={"photo of " + user.first_name} />
                </div>
                <h3>{user.first_name}</h3>
            </div>
            <i className="log-out-icon" onClick={logout} style={{ cursor: "pointer" }}>⇦</i>
        </div>
    )
}

export default ChatHeader