import { SELECT_USER } from '../actions/ActionTypes';

let initialState = 0;

const selectUser = (state = initialState, action) => {
    let newState;
    switch(action.type){
        case SELECT_USER:
            newState = action.key;
            return newState;
        default: 
            return state;
    }
};

export default selectUser;