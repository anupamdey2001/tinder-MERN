import TinderCard from "react-tinder-card"
import { useState, useEffect } from "react";
// import { useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie"
import ChatContainer from "../Components/ChatContainer";
import axios from "axios";



const Dashboard = () => {
    const [user, setUser] = useState(null)
    const [genderedUsers, setGenderedUsers] = useState(null)
    const [lastDirection, setLastDirection] = useState();
    const [cookie, setCookie, removeCookie] = useCookies(['user']);


    const userId = cookie.UserId;


    const getUser = async () => {
        try {
            const response = await axios.get('http://localhost:8000/user', {
                params: { userId }
            })
            setUser(response.data);
        } catch (error) {
            console.log(error)
        }
    }

    const getGenderedUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8000/genderedusers', {
                params: { gender: user?.gender_interest }
            })
            setGenderedUsers(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getUser();
        getGenderedUsers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, genderedUsers])


    console.log(user)
    console.log('Gendered Users', genderedUsers);


    const swiped = (direction, nameToDelete) => {
        console.log('removing: ' + nameToDelete)
        setLastDirection(direction)
    }

    const outOfFrame = (name) => {
        console.log(name + ' left the screen!')
    }

    return (
        <>
            {user &&
                <div className="dashboard">
                    <ChatContainer user={user} />
                    <div className="swipe-container">
                        <div className="card-container">
                            {characters.map((character) =>
                                <TinderCard
                                    className='swipe'
                                    key={character.name}
                                    onSwipe={(dir) => swiped(dir, character.name)}
                                    onCardLeftScreen={() => outOfFrame(character.name)}
                                    preventSwipe={["up", "down"]}
                                >
                                    <div
                                        style={{ backgroundImage: 'url(' + character.url + ')' }}
                                        className='card'
                                    >
                                        <h3>{character.name}</h3>
                                    </div>
                                </TinderCard>
                            )}
                            <div className="swipe-info">
                                {lastDirection ? <p>You Swiped {lastDirection}</p> : <p />}
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Dashboard