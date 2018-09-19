import { takeEvery } from 'redux-saga/effects';
import { ADD_MESSAGE, SET_USERNAME, ADD_USER, SEND_MSG_RECEIVED, MSG_RECEIVED } from '../actions/ActionTypes';
import { usernameSetSuccess, msgUploaded } from '../actions';

const handleNewMessage = function* (params,dispatch) {
    let username;

    yield takeEvery(SET_USERNAME, (action)=>{ 
        let { type , ...payload } = action;
        username = payload.userName;        
                
        params.socket.emit(ADD_USER, JSON.stringify(payload), setUsernameStatus);
    });

    yield takeEvery(ADD_MESSAGE, (action) => {
        if(action.author==="Me"){
            let { type , ...payload } = action;
            payload.author = username;
            params.socket.emit(ADD_MESSAGE,JSON.stringify(payload), setMsgUploadedReceipt);
        }
    });
    
    yield takeEvery(SEND_MSG_RECEIVED, (action)=>{
        let { type , ...payload } = action;
        payload.from = username;        
        params.socket.emit(MSG_RECEIVED, JSON.stringify(payload));
    });

    //helper function
    const setUsernameStatus = (status)=>{
        dispatch(usernameSetSuccess(status));
    };
    const setMsgUploadedReceipt = ( chattingWith, localMsgId, serverMsgId) => {
        dispatch(msgUploaded( chattingWith, localMsgId, serverMsgId));
    };
};

export default handleNewMessage;