import React, { useEffect, useRef, useState } from 'react'
import Message from './Message'
import './ChatBox.css'
import { arrayUnion, doc, getDoc, onSnapshot, setDoc } from 'firebase/firestore'
import { db } from '../context/firebase'
import { getAuth } from 'firebase/auth'

function ChatBox({ currChatId, currActiveUser, currClickedUser }) {
  const [messages, setMessages] = useState([])
  const [activeUserIcon, setActiveUserIcon] = useState([])
  const [clickedUserIcon, setClickedUserIcon] = useState([])
  const [inputValue, setInputValue] = useState('')


  const auth = getAuth()
  const activeUser = auth.currentUser

  useEffect(() => {
    const getChats = async () => {
      if (currChatId) {
        onSnapshot(doc(db, "chat", currChatId), (doc) => {
          const chatData = doc.data()?.chatData;
          if (chatData.length > 0) {
            setMessages([...chatData]);
          }
          else {
            setMessages([])
          }
        })

      }

    };
    getChats();

    const getNewUsers = async () => {
      const activeUserRef = doc(db, 'users', currActiveUser)
      const activeUserSnap = await getDoc(activeUserRef)

      setActiveUserIcon([activeUserSnap.data().icon])
      const clickedUserRef = doc(db, 'users', currClickedUser)
      const clickedUserSnap = await getDoc(clickedUserRef)
      setClickedUserIcon([clickedUserSnap.data().icon])

    }
    getNewUsers();

  }, [currChatId]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value)
  }


  const setChatsToDb = async (inputValue) => {
    if (activeUser && inputValue !== undefined) {
      const newData = {
        chatData: arrayUnion({
          id: activeUser.uid,
          msg: inputValue,
          timestamp: Date.now()
        })
      };
      await setDoc(doc(db, 'chat', currChatId), newData, { merge: true });
    }
  }

  return (
    <div className='chatBox'>
      <div className='messages'>
        {
          messages.length !== 0 && (
            messages.map((value, id) => {
              if (value.id === activeUser.uid) {
                return <Message key={id} userIcon={activeUserIcon[0]} msg={value.msg} messageOwner={true} />
              } else {
                return <Message key={id} userIcon={clickedUserIcon[0]} msg={value.msg} messageOwner={false} />
              }
            }))
        }
      </div>

      <form onSubmit={(e) => {
        e.preventDefault()
        console.log("Submitted message = ", inputValue)
        setChatsToDb(inputValue)
        setInputValue('')
      }} className='userInput'>
        <input id='msgInputBox'
          type="text"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button type='submit' className='sbmtBtn'>Send</button>
      </form>
    </div>
  )
}

export default ChatBox



