import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'
import queryString from 'query-string'

import './chat.css'

import InfoBar from '../InfoBar/InfoBar'
import Input from '../Input/Input'
import Messages from '../Messages/Messages'
import TextContainer from '../TextContainer/TextContainer'

let socket

const Chat = ({ location }) => {
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')
    const [users, setUsers] = useState([])
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const URL_SERVER = 'https://chat-node-react.herokuapp.com/'

    useEffect(() => {
        const { name, room } = queryString.parse(location.search)
        setName(name)
        setRoom(room)

        socket = io(URL_SERVER)

        socket.emit('join', { name, room }, () => {

        })

        return () => {
            socket.emit('disconnect')
            socket.off()
        }

    }, [URL_SERVER, location.search])


    useEffect(() => {
        socket.on('message', message => {
            setMessages([...messages, message])
        })
    }, [messages])

    useEffect(() => {
        socket.on('roomData', ({ users }) => {
            setUsers(users)
        })
    }, [])

    const sendMessage = (event) => {
        event.preventDefault();
    
        if(message) {
          socket.emit('sendMessage', message, () => setMessage(''));
        }
      }

    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room} />
                <Messages
                    messages={messages}
                    name={name}
                />
                <Input
                    setMessage={setMessage}
                    sendMessage={sendMessage}
                    message={message}
                />
            </div>
            <TextContainer users={users} />
        </div>
    )
}

export default Chat