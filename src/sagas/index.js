import { takeEvery } from 'redux-saga/effects';
import { ADD_MESSAGE } from '../actions/ActionTypes';

const handleNewMessage = function* (params) {
    yield takeEvery(ADD_MESSAGE, (action) => {
        if(action.author==="Me"){
            action.author = params.userName;
            params.socket.send(JSON.stringify(action));
        }
    });
};

export default handleNewMessage;