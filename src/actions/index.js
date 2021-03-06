import * as type from './ActionTypes';
import readReceipt from '../utils/ReadReceiptStatus';

let nextMessageId = 0;
let nextUserId = 0;

export const setUsername = (name,userName) => {        
    return({
        type: type.SET_USERNAME,
        name: name,
        userName: userName
    });
}

export const usernameSetSuccess = (status) => {    
    return({
        type: type.USERNAME_SET_SUCCESS,
        status: status
    });
};

export const addMessage = (message, author, target, id) => {
    let newId;
    let status;
    if (id === undefined) {
        newId = nextMessageId++;
        status = readReceipt.CREATED;
    }else{
        newId = id;
        status = readReceipt.UNREAD;
    }
    return({
        type: type.ADD_MESSAGE,
        target: target,
        id: newId,
        message: message,
        author: author,
        status: status
    });
}

export const addUser = (userName) => {
    return({
        type: type.ADD_USER,
        userId: nextUserId++,
        userName: userName
    });
}

export const selectChat = (userName) => {
    return({
        type: type.SELECT_CHAT,
        userName: userName
    });
}

export const showMessage = (message,author) => {
    return({
        type: type.SHOW_MESSAGE,
        id: nextMessageId++,
        message: message,
        author: author
    });
}

export const showUsers = (users) => {   
    return({
        type: type.SHOW_USERS,
        users: users
    });
}

export const highlightUser = (userName) => {
    return({
        type: type.HIGHLIGHT_USER,
        userName: userName
    });
}

export const removeUser = (user) => {
    return({
        type: type.REMOVE_USER,
        user: user
    });
}

export const userTyping = ( chattingWith, isTyping ) => {
    return({
        type: type.USER_TYPING,
        chattingWith: chattingWith,
        isTyping: isTyping
    });
}

export const msgUploaded = ( chattingWith, localMsgId, serverMsgId) => {
    return({
        type: type.MSG_UPLOADED,
        chattingWith: chattingWith,
        localMsgId: localMsgId,
        serverMsgId: serverMsgId
    });
}

export const msgReceived = ( chattingWith, msgId) => {
    return({
        type: type.MSG_RECEIVED,
        chattingWith: chattingWith,
        msgId: msgId
    });
}

export const msgRead = ( chattingWith, msgId) => {
    return({
        type: type.MSG_READ,
        chattingWith: chattingWith,
        msgId: msgId
    });
}

export const msgNone = ( chattingWith, msgId) => {
    return({
        type: type.MSG_NONE,
        chattingWith: chattingWith,
        msgId: msgId
    });
}

export const sendMsgReceived = ( to, msgId ) => {
    return({
        type: type.SEND_MSG_RECEIVED,
        to: to,
        from: null, // this is set in the saga
        msgId: msgId
    });
}

export const sendMsgRead = ( to, msgId ) => {
    return({
        type: type.SEND_MSG_READ,
        to: to,
        from: null, // this is set in the saga
        msgId: msgId
    });
}

export const sendUserTyping = ( to, isTyping ) => {
    return({
        type: type.SEND_USER_TYPING,
        to: to,
        from: null, // this is set in the saga
        isTyping : isTyping
    });
}