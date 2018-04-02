import { combineReducers } from 'redux';
import messages from './messages';
import users from './users';
import selectUser from './selectUser';
import handleUsernameScreen from './handleUsernameScreen';
import setMyUsername from './setMyUsername';

const reducers = combineReducers({
    myName : setMyUsername,
    usernameSetSuccess :  handleUsernameScreen,
    selectedUserIndex: selectUser, 
    messages: messages,
    users: users});

export default reducers;