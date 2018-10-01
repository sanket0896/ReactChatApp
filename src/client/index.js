import sioc from 'socket.io-client';
import { ADD_MESSAGE, SHOW_USERS, ADD_USER, REMOVE_USER, MSG_RECEIVED, MSG_READ } from '../actions/ActionTypes';
import { addMessage, showUsers, highlightUser, removeUser, sendMsgReceived, msgReceived, msgRead } from '../actions';

const setupWebSocket = (store) => {

    let dispatch = store.dispatch;

    // let endPoint = "http://smchats.herokuapp.com:80";
    let endPoint = "localhost:5000";

    const client = sioc(endPoint,{path: "/socket.io"});

    client.on(SHOW_USERS, (data) => {
        data = JSON.parse(data);      
        if(store.getState().usernameSetSuccess) { 
            dispatch(showUsers(data.users));
            }
    });

    client.on(ADD_MESSAGE, (data) => {
        data = JSON.parse(data);
        dispatch(sendMsgReceived( data.author, data.id));
        dispatch(addMessage( data.message, data.author, data.author, data.id));
        dispatch(highlightUser( data.author ));
    });
    
    client.on(REMOVE_USER, (data) => {
        data = JSON.parse(data);
        dispatch(removeUser(data));
    });

    client.on(MSG_RECEIVED, (data) => {
        data = JSON.parse(data);        
        dispatch(msgReceived( data.from, data.msgId ));
    });
    
    client.on(MSG_READ, (data) => {
        data = JSON.parse(data);        
        dispatch(msgRead( data.from, data.msgId ));
    });

    client.on('reconnect', () => {
        client.emit(ADD_USER, store.getState().myName);
    });

    return client;
};


export default setupWebSocket;
