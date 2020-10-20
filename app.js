const express = require('express');
const path = require('path')
const socketio = require('socket.io');
const http = require('http')

const PORT = process.env.PORT || 3000;

app = express();
const server = http.createServer(app);
const io = socketio(server);


io.on('connection',(socket)=>{
    let usermessage = "Welcome!"

    socket.emit('userConnection',usermessage);
    socket.broadcast.emit("userConnection","A new user connected!")
    socket.on('emitMessage',(message)=>{
        io.emit('getMessage',message);
    })

    socket.on('disconnect',()=>{
        console.log("User disconnected");
        io.emit("disconnection","User Disconnected");
    })


})

app.use(express.static(path.join(__dirname,'/public')))


server.listen(PORT,()=>{
    console.log(`App is running on port:${PORT}`);
})