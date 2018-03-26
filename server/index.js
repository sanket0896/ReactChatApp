const WebSocket = require('ws');

const server = new WebSocket.Server({port:8080});

const broadcast = (sendData,ws) => {
    // console.log(" broadcast");
    
    server.clients.forEach((client) => {
        // console.log("client.readyState = ", client.readyState, " & client!==ws is ",client!==ws);
        
        if (client.readyState === 1 && client !== ws) {
            // console.log("broadcast to",client.readyState,"data = ",sendData);
            
            client.send(JSON.stringify(sendData));
        }
    });
};

let users = [];
let messages = [];

server.on('connection',(ws) => {
    // console.log("client connected");
    let index;
    ws.on('message', (message)=> {
        let data;        
        try{
            data = JSON.parse(message); 
        }catch(e){
            data = message;
        }
        
        switch (data.type) {
            case "GET_MESSAGES":
                // console.log("userlist = ",users);
                
                ws.send(JSON.stringify({
                    type: "SHOW_MESSAGE",
                    messages: messages
                }));
                break;

            case "ADD_MESSAGE":  
                let pos = messages.length;
                let newMsg = {
                    id: pos,
                    author: data.author,
                    message: data.message
                };
                messages.push(newMsg);
                console.log("messages = ",messages);
                
                ws.send(JSON.stringify({
                    ...newMsg,
                    author: "Me",
                    type: "ADD_MESSAGE"
                }));                 
                broadcast({
                    ...newMsg,
                    type: "ADD_MESSAGE"
                },ws);
            break;
            
            case "ADD_USER":
                //console.log("on ADD_USER, users list is  ",users)
                index = users.length ? users[users.length-1].id + 1 : 0 ;
                let newUser = {
                    userName: data.name,
                    id: index
                };
                users.push(newUser);
                //console.log("");
                
                ws.send(JSON.stringify({
                    type: "SHOW_USERS",
                    users: users
                }));
                broadcast({
                    type: "SHOW_USERS",
                    users
                },ws);
            break;
    
            default:
                break;
        }
    });

    ws.on('close',()=>{
        // console.log("before splice, users = ",users,"---> index = ", index);        
        let closedUserIndex = users.findIndex((user) => (index===user.id));
        users.splice(closedUserIndex,1);
        // console.log("on close, user list = ", users)
        broadcast({
            type: "SHOW_USERS",
            users: users
        },ws);
    });
});