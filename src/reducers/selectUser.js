import { SELECT_USER } from '../actions/ActionTypes';

let initialState = 0;

const selectUser = (state = initialState, action) => {
    
    switch(action.type){
        case SELECT_USER:
            let newState = action.key;
            return newState;
        default: 
            return state;
    }
};

export default selectUser;