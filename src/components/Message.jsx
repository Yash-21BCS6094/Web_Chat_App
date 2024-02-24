import React from 'react'
import './Message.css'
import Avatar, { genConfig } from 'react-nice-avatar';

function Message({ userIcon, msg, messageOwner }) {
    // console.log("Message => ", user?.icon);
    let config = genConfig(userIcon)
    let msgClass = `message ${messageOwner ? '' : 'owner'}`
    // console(user, msg)
    return (
        <div className={msgClass}>
            <div className="messageInfo">
                <Avatar style={{ width: '3rem', height: '3rem' }} {...config} />
                <span>just now</span>
            </div>
            <div className="messageContent">
                <p className='msgPara'>{msg}</p>
            </div>
        </div>

    )
}

export default Message