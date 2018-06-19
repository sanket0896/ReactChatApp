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
        
        if(receivedData.name!==null) //used to ignore client which is reconnecting but without name
        {
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
                sendStatus(true);
                //send the sender client list of all users except itself.
                socket.emit('SHOW_USERS',JSON.stringify({users}));console.log("sent",users.length," users to",socket.id);
                
                users.push(newUser);
                // send updated user list to everyone else
                socket.broadcast.emit('SHOW_USERS',JSON.stringify({users: [newUser]}));console.log("broadcast",newUser.userName,"to all");
            }
        }
    });

    socket.on('ADD_MESSAGE', (data) => {

        // to parse data in correct form
        let receivedData;
        try{
            receivedData = JSON.parse(data);
        }catch(e){
            receivedData = data;
        }
        
        socket.to(connetedUsers[receivedData.target].id).emit('ADD_MESSAGE',data);
    });

    socket.on('disconnect', () => {
        let closedUserName;
        let closedUserIndex = users.findIndex((user) => {
            if(user.id===socket.id){
                closedUserName=user.userName;
                return true;
            }
        });
        
        if(connetedUsers[closedUserName])
            delete connetedUsers[closedUserName];
        
            socket.broadcast.emit("REMOVE_USER",JSON.stringify(users[closedUserIndex]));
            console.log("remove",users[closedUserIndex]," from all");
            
        
        users.splice(closedUserIndex,1);
    });
});

server.listen(port);