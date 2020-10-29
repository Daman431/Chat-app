const express = require('express');
const path = require('path')
const socketio = require('socket.io');
const http = require('http')

const PORT = process.env.PORT || 3000;
app = express();
const server = http.createServer(app);
const io = socketio(server);
let userArray = [];
let emojiArray = [
    0x1F435,
    0x1F436,
    0x1F431,
    0x1F42F,
    0x1F434,
    0x1F42E,
    0x1F437,
]

const getRandomAvatar = ()=>{
    randomIndex = Math.floor(Math.random()*emojiArray.length);
    return String.fromCodePoint(emojiArray[randomIndex]); 
}

io.on('connection',(socket)=>{
    let avatar = getRandomAvatar();    
    socket.on("login",(data)=>{
        userArray.push({
            id : socket.id,
            username: data.username,
            avatar : avatar
        });
        console.log(userArray);
        data.username = `${userArray[getUserIndex(socket.id)].avatar} ${data.username}`
        io.emit('getMessage',data);
    })
    
    socket.broadcast.emit("userConnection","A new user connected!")
    socket.on('emitMessage',(data)=>{

        data.username = `${userArray[getUserIndex(socket.id)].avatar} ${data.username}`
        io.emit('getMessage',data);
        
    })
   
    socket.on('disconnect',()=>{
        let disconnectedUser;
        if(userArray.length == 0){
            return
        }
        if(userArray[getUserIndex(socket.id)]){
            disconnectedUser = userArray[getUserIndex(socket.id)].username;
            io.emit("disconnection",{
                username : "🤖 Bot",
                message: `💀 ${disconnectedUser} has left the chat!`
            });
            userArray.splice(getUserIndex(socket.id), 1);
        }
        console.log(userArray);
    })


})

const getUserIndex = (socketID)=>{
    if(userArray){
        return userArray.findIndex(user => user.id == socketID);
    }
    return 0;
}

app.use(express.static(path.join(__dirname,'/public')))


server.listen(PORT,()=>{
    console.log(`App is running on port:${PORT}`);
})