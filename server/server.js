const express = require('express');
const http = require('http')
const socketIO = require('socket.io');
let uniqId = require('uniqid');

const app = express();
const server = http.createServer(app);
const sio = socketIO(server);

const port = process.env.PORT || 5000;
let users = [];
let connectedUsers = {};
let allMessages = [];

app.use(express.static('build'));

sio.on('connection',(socket) => {

    
    socket.on('ADD_USER', (data , sendStatus) => {
        
        //to avoid undefined function call
        if(sendStatus === undefined){
            sendStatus = (s)=>{};
        }
        
        // to parse data in correct form
        let receivedData;
        try{
            receivedData = JSON.parse(data);
        }catch(e){
            receivedData = data;
        }
        console.log("received data = ",receivedData);
        
        if(receivedData.userName!==null) //used to ignore client which is reconnecting but without name
        {
            // create new user with all the data
            let newUser = {
                name: receivedData.name,
                userName: receivedData.userName.toLowerCase(),
                id: socket.id
            };
            
            // check if username already exists 
            if (connectedUsers[newUser.userName]) {
                sendStatus(false);
                return;            
            }
            else{
                
                connectedUsers[newUser.userName] = socket.id;
                sendStatus(true);
                //send the sender client list of all users except itself.
                socket.emit('SHOW_USERS',JSON.stringify({users}));
                console.log("sent",users.length," users to",socket.id);
                
                users.push(newUser);
                // send updated user list to everyone else
                socket.broadcast.emit('SHOW_USERS',JSON.stringify({users: [newUser]}));
                console.log("broadcast",newUser.userName,"to all");
            }
        }
    });

    socket.on('ADD_MESSAGE', (data, sendUploadedReceipt) => {

        // to parse data in correct form
        let receivedData;
        try{
            receivedData = JSON.parse(data);
        }catch(e){
            receivedData = data;
        }
        
        if (receivedData.target) {
            let receivedMsgId = receivedData.id;
            let newMessage = { ...receivedData, id : uniqId() };
            allMessages.push(newMessage);
            sendUploadedReceipt( receivedData.target, receivedMsgId, newMessage.id );
            socket.to(connectedUsers[receivedData.target]).emit('ADD_MESSAGE',JSON.stringify(newMessage));
        }
    });
    
    socket.on('MSG_RECEIVED', (data) => {
        
        // to parse data in correct form
        let receivedData;
        try{
            receivedData = JSON.parse(data);
        }catch(e){
            receivedData = data;
        }
        
        if (receivedData.to) {
            let dataToSend = {...receivedData};
            delete dataToSend.to;
            socket.to(connectedUsers[receivedData.to]).emit('MSG_RECEIVED',JSON.stringify(dataToSend));
        }
    });

    socket.on('MSG_READ', (data) => {
        // to parse data in correct form
        let receivedData;
        try{
            receivedData = JSON.parse(data);
        }catch(e){
            receivedData = data;
        }
        
        if (receivedData.to) {
            let dataToSend = {...receivedData};
            delete dataToSend.to;
            socket.to(connectedUsers[receivedData.to]).emit('MSG_READ',JSON.stringify(dataToSend));
        }
    });

    socket.on('USER_TYPING', (data) => {
        // to parse data in correct form
        let receivedData;
        try{
            receivedData = JSON.parse(data);
        }catch(e){
            receivedData = data;
        }
        
        if (receivedData.to) {
            let dataToSend = {...receivedData};
            delete dataToSend.to;
            socket.to(connectedUsers[receivedData.to]).emit('USER_TYPING',JSON.stringify(dataToSend));
            
        }
    });

    socket.on('disconnect', () => {
        let closedUserName;
        let closedUserIndex = users.findIndex((user) => {
            if(user.id===socket.id){
                closedUserName=user.userName;
                return true;
            }
        });
        
        if(connectedUsers[closedUserName]){
            delete connectedUsers[closedUserName];
        
            socket.broadcast.emit("REMOVE_USER",JSON.stringify(users[closedUserIndex]));
            console.log("remove",users[closedUserIndex]," from all");
            
        
            users.splice(closedUserIndex,1);
        }
    });
});

server.listen(port, () => {console.log("listening at port: " + port)});