import { combineReducers } from 'redux';
import messages from './messages';
import users from './users';
import selectUser from './selectUser';
import handleUsernameScreen from './handleUsernameScreen';

const reducers = combineReducers({
    usernameSetSuccess :  handleUsernameScreen,
    selectedUserIndex: selectUser, 
    messages: messages,
    users: users});

export default reducers;