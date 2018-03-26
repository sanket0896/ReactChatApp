import { ADD_USER, SHOW_USERS } from "../actions/ActionTypes";

let initialState = [];

const users = (state = initialState , action) => {
    let newState = state;
    switch(action.type){
        case ADD_USER:
            return(
                newState.concat([{
                    id: action.userId,
                    userName: action.userName
                }])
            );

        case SHOW_USERS: 
            newState = [];            
            return newState.concat(action.users);

        default: 
            return newState;
    }
}

export default users;