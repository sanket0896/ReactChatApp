const express = require('express');
const http = require('http')
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const sio = socketIO(server);

const port = process.env.PORT || 5000;
let users = [];
let connetedUsers = {};

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
        
        // create new user with all the data
        let newUser = {
            userName: receivedData.name.toLowerCase(),
            id: socket.id
        };

        // check if username already exists 
        if (connetedUsers[newUser.userName]) {
            sendStatus(false);
            return;            
        }
        else{
            connetedUsers[newUser.userName] = socket;
            users.push(newUser);
            sendStatus(true);
        }
        
        // send updated user list to everyone
        sio.emit('SHOW_USERS',JSON.stringify({users}));
    });

    socket.on('ADD_MESSAGE', (data) => {
        socket.broadcast.emit('ADD_MESSAGE',data);
    });

    socket.on('disconnect', () => {
        let closedUserIndex = users.findIndex((user) => (user.id===socket.id));
        
        delete connetedUsers[users[closedUserIndex].userName];
        users.splice(closedUserIndex,1);
        // users[closedUserIndex].id=null;
        
        
        socket.broadcast.emit("SHOW_USERS",JSON.stringify({users}));
    });
});

server.listen(port);