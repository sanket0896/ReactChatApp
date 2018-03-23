import { combineReducers } from 'redux';
import messages from './messages';
import users from './users';

const chat = combineReducers({
    messages: messages,
    users: users});

export default chat;