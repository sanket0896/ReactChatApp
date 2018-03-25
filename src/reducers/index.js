import { combineReducers } from 'redux';
import messages from './messages';
import users from './users';
import selectUser from './selectUser';

const chat = combineReducers({
    selectedUserIndex: selectUser, 
    messages: messages,
    users: users});

export default chat;