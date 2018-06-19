import { SELECT_CHAT } from '../actions/ActionTypes';

let initialState = null;

const selectChat = (state = initialState, action) => {
    let newState;
    
    switch(action.type){
        case SELECT_CHAT:        
            newState = action.userName;
            return newState;
        default: 
            return state;
    }
};

export default selectChat;