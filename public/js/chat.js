const socket = io();

socket.on('userConnection',(welcomeMessage)=>{
    console.log(welcomeMessage);
})


document.getElementById("userMessage").addEventListener("keydown",(event)=>{
    if(event.which == 13 || event.keyCode == 13){
        console.log("enter pressed!");
        sendMessage();
    }
})

const sendMessage = ()=>{
    let message = document.querySelector('#userMessage').value;
    socket.emit('emitMessage',message);
    document.getElementById("userMessage").value = ''
}


socket.on("disconnection",(disconnectionMessage)=>{
    console.log(disconnectionMessage)
})


let chatContainer = document.querySelector(".chat-container");
socket.on('getMessage',(message)=>{
    let messageBox = document.createElement('div');
    messageBox.appendChild(document.createTextNode(message))
    chatContainer.appendChild(messageBox);
})