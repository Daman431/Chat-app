const socket = io();



// Submit by enter

document.getElementById("userMessage").addEventListener("keydown",(event)=>{
    if(event.which == 13 || event.keyCode == 13){
        sendMessage();
    }
})

document.getElementById("username").addEventListener("keydown",(event)=>{
    if(event.which == 13 || event.keyCode == 13){
        setUsername();
    }
})

//Set Username In the chat

let username = document.getElementById("username").value;
console.log(username);
const setUsername = ()=>{
    let data = {
        username: this.username.value,
        message:`📢 ${this.username.value} has joined the chat!`
    }
    if(!document.getElementById("username").value){
        document.getElementById("username").placeholder = 'Missing!';
        return null;
    }

    //Toggle classes
    document.getElementsByClassName("main-container")[0].style = "display:flex";
    document.getElementsByClassName("userInput-container")[0].style = "display:none"
    socket.emit('login',data);
}


const sendMessage = ()=>{
    let message = document.querySelector('#userMessage').value;
    let data = {
        message : message,
        username: this.username.value
    }
    if(!document.querySelector('#userMessage').value){
        return null;
    }
    socket.emit('emitMessage',data);
    document.getElementById("userMessage").value = ''
}

//On disconnection

socket.on("disconnection",(data)=>{
    console.log(data)
    printMessage(data)
})


//Get and Create the Message

let chatContainer = document.querySelector(".chat-container");
socket.on('getMessage',(data)=>{    
    printMessage(data);
    
})

const printMessage = (data)=>{
    let messageBox = document.createElement('div');
    let usernameContainer = document.createElement('div');
    usernameContainer.appendChild(document.createTextNode(data.username));
    usernameContainer.classList = "username-container"

    messageBox.classList = 'message-container'
    messageBox.appendChild(usernameContainer)
    messageBox.appendChild(document.createTextNode(data.message))
    chatContainer.appendChild(messageBox);
}