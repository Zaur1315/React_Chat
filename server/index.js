const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const route = require('./route');
const app = express();

app.use(cors({ origin : "*" }));
app.use(route)

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket)=>{
    socket.on('join', ({name, room})=>{
        socket.join(room)

        socket.emit('message', {
            data: { user: {name: 'Admin'}, message: `Hey my friend ${name}` }
        });
    })


    io.on('disconnetcion',()=>console.log('Disconnect'))
})

server.listen(5000, () =>{
    console.log('server is running')
});