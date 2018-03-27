import { ADD_MESSAGE, ADD_USER, SHOW_USERS } from '../actions/ActionTypes';
import { addMessage, addUser, showUsers } from '../actions';

const setupWebSocket = (dispatch) => {

const client = new WebSocket("ws://chat-app-server-0001.herokuapp.com:8080");

client.onmessage = (message) => {
    let data;
    // console.log("message",client.url);    
    try{
        data = JSON.parse(message.data); 
    }catch(e){
        data = message.data;
    }
    // console.log(data);
    switch (data.type) {
        case ADD_MESSAGE:
            // console.log(data.type,"---> msg = ",data.message," ---> auth = ",data.author);
            dispatch(addMessage(data.message,data.author));
            break;
    
        case ADD_USER:
            // console.log(data.type,"---> username = ",data.username);
            dispatch(addUser(data.userName));
            break;
    
        case SHOW_USERS:
            // console.log("in client actions file. type= ",data.type,"---> users = ",data.users);
            dispatch(showUsers(data.users));
            break;
    
        default:
            break;
    }
};
return client;
};

export default setupWebSocket;