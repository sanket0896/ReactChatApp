import sioc from 'socket.io-client';
import { ADD_MESSAGE, SHOW_USERS, ADD_USER } from '../actions/ActionTypes';
import { addMessage, showUsers } from '../actions';

const setupWebSocket = (store) => {

    let dispatch = store.dispatch;

    // let endPoint = "http://smchats.herokuapp.com:80";
    let localhost = "localhost:5000";

    const client = sioc(localhost,{path: "/socket.io"});

    client.on(SHOW_USERS, (data) => {
        data = JSON.parse(data);
        dispatch(showUsers(data.users));
    });

    client.on(ADD_MESSAGE, (data) => {
        data = JSON.parse(data);
        dispatch(addMessage(data.message,data.author));
    });

    client.on('reconnect', () => {
        client.emit(ADD_USER, {name: store.getState().myName});
    });

    return client;
};


export default setupWebSocket;