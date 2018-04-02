import { takeEvery } from 'redux-saga/effects';
import { ADD_MESSAGE, SET_USERNAME, ADD_USER } from '../actions/ActionTypes';

const handleNewMessage = function* (params) {
    let username;

    yield takeEvery(SET_USERNAME, (action)=>{ 
        let { type , ...payload } = action;
        username = payload.name;        
        params.socket.emit(ADD_USER, JSON.stringify(payload));
    });
    yield takeEvery(ADD_MESSAGE, (action) => {
        if(action.author==="Me"){
            let { type , ...payload } = action;
            payload.author = username;
            params.socket.emit(ADD_MESSAGE,JSON.stringify(payload));
        }
    });
};

export default handleNewMessage;