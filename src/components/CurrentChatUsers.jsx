import React, { useState, useEffect } from 'react';
import User from './User';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../context/firebase';
import { getAuth } from 'firebase/auth'

function CurrentChatUsers({ friends, setCurrChatId }) {
    const [currentData, setCurrentData] = useState([]);
    const auth = getAuth()
    const user = auth.currentUser

    const setChatId = (user, clickedUser) => {
        const sortString = (str) => {
            return str.split('').sort().join('')
        }
        let str1 = sortString(user + clickedUser);
        return str1;
    }

    const handleClickedUser = async (clickedUser) => {
        let id = setChatId(user.uid, clickedUser.id)
        const chatDocRef = doc(db, 'chat', id);
        const chatDocSnapshot = await getDoc(chatDocRef);
        if (!chatDocSnapshot.exists()) {
            try {
                await setDoc(doc(db, 'chat', id), {
                    chatData: [],
                }, { merge: true });
                console.log("Document successfully created!");
            } catch (error) {
                console.error("Error creating document: ", error);
            }
        }
        else {
            console.log(chatDocSnapshot.data().chatData)
        }
        setCurrChatId(user.uid, clickedUser.id)
    }

    useEffect(() => {
        const fetchData = async () => {
            const newData = [];
            for (const friend of friends) {
                const friendRef = doc(db, 'users', friend);
                const docSnap = await getDoc(friendRef);
                newData.push(docSnap.data());
            }
            setCurrentData(newData);
        };

        if (friends.length > 0) {
            fetchData();
        }
    }, [friends]);

    return (
        <div>
            {currentData.map((value, id) => (
                <User
                    key={id}
                    user={value}
                    toAdd={false}
                    onClick={() => handleClickedUser(value)}
                />
            ))}
        </div>
    );
}

export default CurrentChatUsers;