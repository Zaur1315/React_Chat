import React from 'react'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import io from 'socket.io-client'

const socket = io.connect('http://localhost:5000/')


const Chat = () => {
  
    const {search} = useLocation()

    const [paraps, setParams] = useState(null)

    useEffect(() => {
        const searchParams = Object.fromEntries(new URLSearchParams(search))
        setParams(searchParams);
        socket.emit('join', searchParams);
    },[search]);

    useEffect(()=>{
        socket.on('message', ({data})=>{
            console.log(data)
        })
    }, [])
    
    // console.log(paraps)
  
    return (
    <div>Chat</div>
  )
}

export default Chat