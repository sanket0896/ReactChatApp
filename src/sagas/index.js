import { takeEvery } from 'redux-saga/effects';
import { ADD_MESSAGE, SET_USERNAME, ADD_USER } from '../actions/ActionTypes';

const handleNewMessage = function* (params) {
    let username;
    yield takeEvery(SET_USERNAME, (action)=>{
        action.type = ADD_USER;
        username = action.name;
        params.socket.send(JSON.stringify(action));
    });
    yield takeEvery(ADD_MESSAGE, (action) => {
        if(action.author==="Me"){
            action.author = username;
            params.socket.send(JSON.stringify(action));
        }
    });
};

export default handleNewMessage;