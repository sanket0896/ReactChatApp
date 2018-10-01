import { takeEvery } from 'redux-saga/effects';
import { ADD_MESSAGE, SET_USERNAME, ADD_USER, SEND_MSG_RECEIVED, MSG_RECEIVED, SEND_MSG_READ, MSG_READ, SEND_USER_TYPING, USER_TYPING } from '../actions/ActionTypes';
import { usernameSetSuccess, msgUploaded } from '../actions';

const handleNewMessage = function* (params,dispatch) {
    let username;

    yield takeEvery(SET_USERNAME, (action)=>{ 
        let { type , ...payload } = action;
        username = payload.userName.toLowerCase();        
                
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
    
    yield takeEvery(SEND_MSG_READ, (action)=>{
        let { type , ...payload } = action;
        payload.from = username;
        
        params.socket.emit(MSG_READ, JSON.stringify(payload));
    });

    yield takeEvery(SEND_USER_TYPING, (action)=>{
        let { type , ...payload } = action;
        payload.from = username;
        
        params.socket.emit(USER_TYPING, JSON.stringify(payload));
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