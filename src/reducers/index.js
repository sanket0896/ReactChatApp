import { combineReducers } from 'redux';
import messages from './messages';
import users from './users';
import selectChat from './selectChat';
import handleUsernameScreen from './handleUsernameScreen';
import setMyUsername from './setMyUsername';
import updateChatHistory from './updateChatHistory';

const reducers = combineReducers({
    myName : setMyUsername,
    usernameSetSuccess :  handleUsernameScreen,
    selectedChat: selectChat, 
    messages: messages,
    chatHistory: updateChatHistory,
    users: users});

export default reducers;