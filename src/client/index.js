import sioc from 'socket.io-client';
import { ADD_MESSAGE, SHOW_USERS, ADD_USER, REMOVE_USER } from '../actions/ActionTypes';
import { addMessage, showUsers, highlightUser, removeUser } from '../actions';

const setupWebSocket = (store) => {

    let dispatch = store.dispatch;

    let endPoint = "http://smchats.herokuapp.com:80";
    //let localhost = "localhost:5000";

    const client = sioc(localhost,{path: "/socket.io"});

    client.on(SHOW_USERS, (data) => {
        data = JSON.parse(data);      
        console.log("in client, SHOW_USERS");
        if(store.getState().usernameSetSuccess) { 
            dispatch(showUsers(data.users));console.log("dispatched");
            }
    });

    client.on(ADD_MESSAGE, (data) => {
        data = JSON.parse(data);
        dispatch(addMessage(data.message,data.author,data.author));
        dispatch(highlightUser(data.author));
    });
    
    client.on(REMOVE_USER, (data) => {
        data = JSON.parse(data);
        dispatch(removeUser(data));
    });

    client.on('reconnect', () => {
        client.emit(ADD_USER, store.getState().myName);
    });

    return client;
};


export default setupWebSocket;
