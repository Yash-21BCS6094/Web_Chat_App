import React, { useState } from 'react'
import AvatarFile from './Avatar/AvatarFile'
import { genConfig } from 'react-nice-avatar'
import { setDoc, doc } from 'firebase/firestore'
import { db } from '../context/firebase'
import { useNavigate } from 'react-router-dom'
import { getAuth } from 'firebase/auth'

function AvatarDashboard() {
    const auth = getAuth();
    const user = auth.currentUser;
    const [name, setName] = useState("")
    const [sex, setSex] = useState('man')
    const config = genConfig({ sex: sex }, name)
    const navigate = useNavigate()

    const handleSubmit = () => {
        setDoc(doc(db, "users", user.uid), {
            icon: config,
            name: name,
            sex: sex,
            email: user.email,
        }, { merge: true }).then((value) => navigate('/chat', { replace: true }))
            .catch((error) => console.log(error))
    }
    return (
        <AvatarFile
            name={name}
            handleName={(e) => setName(e.target.value)}
            handleSex={(e) => setSex(e.target.value)}
            handleSubmit={handleSubmit}
            config={config}
        />
    )
}

export default AvatarDashboard