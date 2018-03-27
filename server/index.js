const WebSocket = require('ws');

const server = new WebSocket.Server({ host : "www.chat-app-server-0001.herokuapp.com", port : 8080 });


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

server.on('connection',(ws) => {
    // console.log("client connected",server.address());
    let index;
    ws.on('message', (message)=> {
        let data;        
        try{
            data = JSON.parse(message); 
        }catch(e){
            data = message;
        }
        
        switch (data.type) {
            case "ADD_MESSAGE":                   
                    broadcast({
                        type: "ADD_MESSAGE",
                        author: data.author,
                        message: data.message
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