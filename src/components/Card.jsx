import React from 'react';
import './Card.css';
function Card(props) {
    return (
        <>
            <div className='mainBack'>
                <div className='backgroundDiv'>
                    <div className='profileDiv'>
                        <img id='img'
                            src={props.image}
                            alt=""
                        />
                    </div>
                    <div className='userName'>
                        <input
                            type="text"
                            name=""
                            id="userNameId"
                            placeholder='Username'
                            value={props.username}
                            onChange={props.onUsernameChange}
                            autoComplete="off"
                        />
                    </div>
                    <div className='passWord'>
                        <input
                            type="text"
                            name=""
                            id="passWordId"
                            placeholder={props.placeholder}
                            value={props.password}
                            onChange={props.onPassWordChange}
                            autoComplete="off"
                        />
                    </div>
                    <div className='submitButton'>
                        <button id='sbmt' onClick={props.onSbmt}>{props.button}</button>
                    </div>
                    <div className="signUpAndForgot">
                        {props.showH4 && (
                            <React.Fragment>
                                <div className='forgot' onClick={props.isForgotClicked}>
                                    <h4>Forgot Password?</h4>
                                </div>
                                <div className='signUp' onClick={props.isSignUpClicked}>
                                    <h4>Sign Up?</h4>
                                </div>
                            </React.Fragment>
                        )}
                    </div>
                </div>
                
            </div>

        </>

    )
}

export default Card;