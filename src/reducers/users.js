import { ADD_USER, SHOW_USERS } from "../actions/ActionTypes";

const users = (state = [], action) => {
    switch(action.type){
        case ADD_USER:
            return(
                state.concat([{
                    id: action.id,
                    userName: action.userName
                }])
            );

        case SHOW_USERS: 
            return(action.users);

        default: 
            return state;
    }
}

export default users;