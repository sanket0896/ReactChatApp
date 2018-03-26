import { ADD_MESSAGE, ADD_USER, SHOW_USERS, GET_MESSAGES, SHOW_MESSAGE } from '../actions/ActionTypes';
import { addMessage, addUser, showUsers, showMessages } from '../actions';

const setupWebSocket = (dispatch) => {

const client = new WebSocket("ws://localhost:8080");

client.onopen = () => {
    // client.send(JSON.stringify({
    //     type: GET_MESSAGES
    // }));
}

client.onmessage = (message) => {
    let data;
    // console.log(message);    
    try{
        data = JSON.parse(message.data); 
    }catch(e){
        data = message.data;
    }
    // console.log(data);
    switch (data.type) {
        case ADD_MESSAGE:
            // console.log(data.type,"---> msg = ",data.message," ---> auth = ",data.author);
            dispatch(addMessage(data.message,data.author,data.id));
            break;
    
        case ADD_USER:
            // console.log(data.type,"---> username = ",data.username);
            dispatch(addUser(data.userName));
            break;
    
        case SHOW_USERS:
            // console.log("in client actions file. type= ",data.type,"---> users = ",data.users);
            dispatch(showUsers(data.users));
            break;

        case SHOW_MESSAGE:
            dispatch(showMessages(data.messages));
            break;
    
        default:
            break;
    }
};
return client;
};

export default setupWebSocket;