import React from 'react';
import './AvatarFile.css';
import Avatar from 'react-nice-avatar';

function AvatarFile(props) {
    return (
        <div className='mainBoard2'>
            <div className='workBoard2'>
                <div className='avatarFile'>
                    <Avatar style={{ width: '8rem', height: '8rem' }} {...props.config} />
                </div>
                <input
                    type="text"
                    id='nameField'
                    placeholder='Enter your name'
                    value={props.name}
                    onChange={props.handleName}
                />
                <div className='radioButton' >
                    <input type="radio" id='male' name='gender' value={'man'} onChange={props.handleSex}/>
                    <label htmlFor="male">Male</label>
                    <input type="radio" id='female' name='gender' value={'woman'} onChange={props.handleSex}/>
                    <label htmlFor="female">Female</label>
                </div>
                <button type="submit" id='sbmt2' onClick={props.handleSubmit}>
                    Submit
                </button>
            </div>
        </div>
    );
}

export default AvatarFile; 
