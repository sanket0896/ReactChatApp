import * as type from './ActionTypes';

let nextMessageId = 0;
let nextUserId = 0;

export const setUsername = (userName) => {    
    return({
        type: type.SET_USERNAME,
        name: userName
    });
}

export const usernameSetSuccess = (status) => {    
    return({
        type: type.USERNAME_SET_SUCCESS,
        status: status
    });
};

export const addMessage = (message, author, target) => {
    return({
        type: type.ADD_MESSAGE,
        target: target,
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

export const unhighlightUser = (userName) => {
    console.log("here");
    
    return({
        type: type.UNHIGHLIGHT_USER,
        userName: userName
    });
}

