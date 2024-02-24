import React from 'react'
import { IoMdAddCircleOutline } from "react-icons/io";
import Avatar, { genConfig } from 'react-nice-avatar';
import './User.css'

function User({ user, toAdd, addUserInChat, onClick }) {
  const config = genConfig(user.icon)
  const userClass = `user ${toAdd ? '' : 'toAddFalse'}`;
  if (!user.name) {
    return;
  }
  return (
    <div className={userClass} onClick={onClick}>
      <Avatar style={{ width: '3rem', height: '3rem' }} {...config} />
      <div className='userData'>
        <p >{user.name}</p>
        {toAdd && <IoMdAddCircleOutline className='addIcon' onClick={addUserInChat} />}
      </div>
    </div>
  )
}

export default User