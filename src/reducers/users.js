import { ADD_USER, SHOW_USERS } from "../actions/ActionTypes";

let initialState = [];

const users = (state = initialState , action) => {
    let newState = state;
    switch(action.type){
        case ADD_USER:
            return(
                newState.concat([{
                    id: action.id,
                    userName: action.userName
                }])
            );

        case SHOW_USERS: 
            return(newState.users);

        default: 
            return newState;
    }
}

export default users;