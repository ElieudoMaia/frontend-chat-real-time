import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import './join.css'

const Join = () => {
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')

    function handleClickSubmit(event) {
        return (!name || !room) ? event.preventDefault() : null
    }
    
    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className="heading">Join to chat</h1>
                <div>
                    <input type="text" placeholder="Name" value={name} className="joinInput" onChange={event => setName(event.target.value)} />
                </div>
                <div>
                    <input type="text" placeholder="Room" value={room} className="joinInput mt-20" onChange={event => setRoom(event.target.value)} />
                </div>
                <Link
                    onClick={handleClickSubmit}
                    to={`/chat?name=${name}&room=${room}`}
                >
                    <button className="button mt-20" type="submit">Sign In</button>
                </Link>
            </div>
        </div>
    )
}

export default Join