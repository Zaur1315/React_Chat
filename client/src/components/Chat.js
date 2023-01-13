import React from 'react'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import Messages from './Messages';
import io from 'socket.io-client'
import styles from '../styles/Chat.module.css'
import EmojiPicker from 'emoji-picker-react'

import img from '../img/emoji.svg'

const socket = io.connect('http://localhost:5000/')


const Chat = () => {
  
    const {search} = useLocation()  
    const [params, setParams] = useState({room:'', user: ''})
    const [state, setState] = useState([]);
    const [message, setMessage] = useState('');
    const [isOpen, setOpen] = useState(false)
    
    useEffect(() => {
        const searchParams = Object.fromEntries(new URLSearchParams(search))
        setParams(searchParams);
        socket.emit('join', searchParams);
    },[search]);

    useEffect(()=>{
        socket.on('message', ({data})=>{
            setState((_state)=>([..._state, data]))})

    }, []);

    const handleChange = ({target: {value}}) => setMessage(value)

    const leftRoom = () =>{}

    const onEmojiClick = ({ emoji }) => setMessage(`${message} ${emoji}`);

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!message) return;

        socket.emit('sendMessage', {})
    }

    return (
<div className={styles.wrap}>
      <div className={styles.header}>
        <div className={styles.title}>{params.room}</div>
        <div className={styles.users}> users in this room</div>
        <button className={styles.left} onClick={leftRoom}>
          Left the room
        </button>
      </div>

      <div className={styles.messages}>
         <Messages messages={state} name={params.name} /> 
        
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.input}>
          <input
            type="text"
            name="message"
            placeholder="What do you want to say?"
            value={message}
            onChange={handleChange}
            autoComplete="off"
            required
          />
        </div>
        <div className={styles.emoji}>
          <img src={img} alt="" onClick={() => setOpen(!isOpen)} />

          {isOpen && (
            <div className={styles.emojies}>
              <EmojiPicker onEmojiClick={onEmojiClick} />
            </div>
          )}
        </div>

        <div className={styles.button}>
          <input type="submit" onSubmit={handleSubmit} value="Send a message" />
        </div>
      </form>
    </div>
  )
}

export default Chat