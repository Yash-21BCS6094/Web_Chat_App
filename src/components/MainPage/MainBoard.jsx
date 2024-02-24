import React, { useEffect, useState } from 'react'
import './MainBoard.css'
import { FaFacebookMessenger } from "react-icons/fa"
import { FaUserPlus } from "react-icons/fa6"
import User from '../User'
import { db } from '../../context/firebase'
import { collection, doc, updateDoc, arrayUnion, onSnapshot } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import CurrentChatUsers from '../CurrentChatUsers'
import ChatBox from '../ChatBox'

function MainBoard() {
    const [usersData, setUsersData] = useState([])
    const [show, setShow] = useState(false)
    const [chatUsers, setChatUsers] = useState([])
    const [currChatId, setCurrChatId] = useState("")
    const [currActiveUser, setCurrActiveUser] = useState()
    const [currClickedUser, setCurrClickedUser] = useState()


    const auth = getAuth()
    const user = auth.currentUser

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'users'), (snapshot) => {
            const newData = snapshot.docs.map((doc) => doc.data());
            console.log(newData)
            setUsersData(newData);
        });

        return () => unsubscribe();
    }, [])


    useEffect(() => {
        const unsubscribe = onSnapshot(doc(db, 'users', user?.uid), snapshot => {
            setChatUsers(snapshot.data()?.friends || []);
        });

        return () => unsubscribe();

    }, [user])
    console.log("currClicked User: ", currClickedUser)

    const addUserInChat = async (data) => {
        // Update user document with a new friend ID
        const currentUserDocRef = doc(db, 'users', user?.uid) // logged IN user
        await updateDoc(currentUserDocRef, {
            friends: arrayUnion(data.id)
        });
        const friendDocRef = doc(db, 'users', data?.id) // logged IN user
        await updateDoc(friendDocRef, {
            friends: arrayUnion(user.uid)
        });
        // Till Here I updated the users friendList in the firebase.

        // From here I am handling the case where the user is clicking on a particular user component to add him
        // or her in chat list. the logic is simple I am getting the user object when the current user clicks
        // on the user he wants to add in his chat list. So using the id of the user to get listed I add him
        // if he is not already present in the chatUsers.
        // console.log(data)
        console.log("Friend added");
    }

    const setChatId = (user, clickedUser) => {
        const sortString = (str) => {
            return str.split('').sort().join('')
        }
        let str1 = sortString(user + clickedUser)
        setCurrActiveUser(user)
        setCurrClickedUser(clickedUser)
        setCurrChatId(() => {
            return str1
        })
        console.log("Chatid set")
        console.log(currChatId)
    }

    return (
        <div className='mainBoard'>
            <div className='workBoard'>
                <div className='menuBar'>
                    <div className='iconAndLogo'>
                        <p className='icon'>Messenger</p>
                        <FaFacebookMessenger />
                    </div>
                    <FaUserPlus
                        className='addUser'
                        onClick={(e) => { setShow(!show) }}
                    />
                    <div className='toAddUser'>
                        {show && (
                            usersData.map((data, id) => (
                                <User
                                    key={id}
                                    user={data}
                                    toAdd={true}
                                    addUserInChat={() => addUserInChat(data)}
                                />
                            ))
                        )}
                    </div>
                </div>
                <div className='chatDiv'>
                    <div className='friendDiv'>
                        <CurrentChatUsers
                            friends={chatUsers}
                            setCurrChatId={setChatId}
                        />
                    </div>
                    <div className='currentChat'>
                        {
                            currChatId && 
                            <ChatBox
                            currChatId={currChatId}
                            currActiveUser={currActiveUser}
                            setCurrClickedUser={setCurrClickedUser}
                            currClickedUser={currClickedUser}
                            />
                        }
                    </div>
                </div>
            </div>
        </div>

    )
}

export default MainBoard
