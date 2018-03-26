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

export const sendMessage = (message,author) => {
    return({
        type: type.SEND_MESSAGE,
        author: author,
        message: message
    });
}

export const addMessage = (message, author, id) => {
    return({
        type: type.ADD_MESSAGE,
        id: id,
        message: message,
        author: author
    });
}

export const getMessages = () => {
    return({
        type: type.GET_MESSAGES
    })
}

export const showMessages = (messages) => {
    return({
        type: type.SHOW_MESSAGE,
        messages: messages
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

export const showUsers = (users) => {
    
    return({
        type: type.SHOW_USERS,
        users: users
    });
}
