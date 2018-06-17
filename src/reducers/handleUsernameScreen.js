import { USERNAME_SET_SUCCESS } from "../actions/ActionTypes";

let initialState = null;

const handleUSernameScreen = (state = initialState , action) => {
    let newState;
    
    console.log("in reducer usernamesetsuccess--> action type is ",action.type);
    switch(action.type){
        case USERNAME_SET_SUCCESS:
            newState = action.status;
            return newState;
        default:
            return state;
    }
}

export default handleUSernameScreen;