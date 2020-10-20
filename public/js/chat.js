const socket = io();

socket.on('userConnection',(welcomeMessage)=>{
    console.log(welcomeMessage);
})


document.getElementById("userMessage").addEventListener("keydown",(event)=>{
    if(event.which == 13 || event.keyCode == 13){
        console.log("key pressed!");
        sendMessage();
    }
})



let username = document.getElementById("username").value;
const setUsername = ()=>{
    let data = {
        username: this.username.value,
        message:`${this.username.value} has joined the chat!`
    }
    document.getElementsByClassName("main-container")[0].style = "display:flex";
    document.getElementsByClassName("userInput-container")[0].style = "display:none"
    socket.emit('emitMessage',data);
}


const sendMessage = ()=>{
    let message = document.querySelector('#userMessage').value;
    let data = {
        message : message,
        username: this.username.value
    }
    socket.emit('emitMessage',data);
    document.getElementById("userMessage").value = ''
}


socket.on("disconnection",(disconnectionMessage)=>{
    console.log(disconnectionMessage)
})



let chatContainer = document.querySelector(".chat-container");
socket.on('getMessage',(data)=>{
    let messageBox = document.createElement('div');
    let usernameContainer = document.createElement('div');
    console.log(data);
    usernameContainer.appendChild(document.createTextNode(data.username));
    usernameContainer.classList = "username-container"

    messageBox.classList = 'message-container'
    messageBox.appendChild(usernameContainer)
    messageBox.appendChild(document.createTextNode(data.message))
    chatContainer.appendChild(messageBox);
})