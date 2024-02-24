import React, { useState } from 'react'
import Card from './Card';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { app } from '../context/firebase';

function handleForgot(navigate) {
  console.log("Forgot Clicked");
  navigate('/ForgotPage');
}

function handleSignUp(navigate) {
  console.log("SignUp Clicked");
  navigate('/SignUpPage');
}

function LoginPage() {
  
  let button = "Sign In"
  let showH4 = true
  let image = "data:image/png;base64,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"

  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const auth = getAuth(app)

  const onSbmt = (event) => {
    console.log(username, password)
    signInWithEmailAndPassword(auth, username, password)
      .then((value) => (navigate('/chat')))
      .catch((error) => (console.log(error)))
  }

  return (
      <Card button={button}
        showH4={showH4}
        isForgotClicked={() => handleForgot(navigate)}
        isSignUpClicked={() => handleSignUp(navigate)}
        placeholder={"Password"}
        image={image}
        username={username}
        password={password}
        onUsernameChange={(e) => setUsername(e.target.value)}
        onPassWordChange={(e) => setPassword(e.target.value)}
        onSbmt={onSbmt}
      />
    )
}

export default LoginPage