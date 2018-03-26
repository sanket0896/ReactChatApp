import { ADD_USER, SHOW_USERS } from "../actions/ActionTypes";

let initialState = [];

const users = (state = initialState , action) => {
    let newState;
    switch(action.type){
        case ADD_USER:
            newState = state.concat([{
                id: action.userId,
                userName: action.userName
            }]);
            return newState;

        case SHOW_USERS: 
            newState = [];            
            return newState.concat(action.users);

        default: 
            return state;
    }
}

export default users;