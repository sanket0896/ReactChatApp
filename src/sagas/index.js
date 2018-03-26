import { takeEvery } from 'redux-saga/effects';
import { SET_USERNAME, ADD_USER, GET_MESSAGES, SEND_MESSAGE, ADD_MESSAGE } from '../actions/ActionTypes';

const handleNewMessage = function* (params) {
    let username;
    yield takeEvery(SET_USERNAME, (action)=>{
        action.type = ADD_USER;
        username = action.name;
        // console.log("sega sending",action.type);        
        params.socket.send(JSON.stringify(action));
    });
    yield takeEvery(SEND_MESSAGE, (action) => {
        action.author = username;
        action.type = ADD_MESSAGE;
        // console.log("sega sending",action.type);
        params.socket.send(JSON.stringify(action));
    });
    yield takeEvery(GET_MESSAGES, (action) => {
        // console.log("sega sending",action.type);
        params.socket.send(JSON.stringify(action));
    });
};

export default handleNewMessage;