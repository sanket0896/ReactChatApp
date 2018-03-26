import * as type from './ActionTypes';

let nextMessageId = 0;
let nextUserId = 0;

export const addMessage = (message, author) => {
    return({
        type: type.ADD_MESSAGE,
        id: nextMessageId++,
        message: message,
        author: author
    });
}

export const addUser = (userName) => {
    return({
        type: type.ADD_USER,
        userId: nextUserId++,
        userName: userName
    });
}

export const selectUser = (key) => {
    return({
        type: type.SELECT_USER,
        key: key
    });
}

export const messageReceived = (message,author) => {
    return({
        type: type.MESSAGE_RECEIVED,
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