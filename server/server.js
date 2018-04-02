const express = require('express');
const http = require('http')
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const sio = socketIO(server);

const port = process.env.PORT || 5000;
let users = [];

app.use(express.static('build'));

sio.on('connection',(socket) => {

    let index;

    socket.on('ADD_USER', (data) => {

        let receivedData;
        try{
            receivedData = JSON.parse(data);
        }catch(e){
            receivedData = data;
        }
        
        index = users.length ? users[users.length-1].id + 1 : 0 ;
        let newUser = {
            userName: receivedData.name,
            id: index
        };
        users.push(newUser);
        
        sio.emit('SHOW_USERS',JSON.stringify({users}));
    });

    socket.on('ADD_MESSAGE', (data) => {
        socket.broadcast.emit('ADD_MESSAGE',data);
    });

    socket.on('disconnect', () => {
        let closedUserIndex = users.findIndex((user) => (index===user.id));
        users.splice(closedUserIndex,1);
        socket.broadcast.emit("SHOW_USERS",JSON.stringify({users}));
    });
});

server.listen(port);