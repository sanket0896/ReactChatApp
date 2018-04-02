import { SET_USERNAME } from "../actions/ActionTypes";

let initialState = "no name";

const handleUSernameScreen = (state = initialState , action) => {
    let newState;
    
    switch(action.type){
        case SET_USERNAME:
            newState = action.name;
            return newState;
        default:
            return state;
    }
}

export default handleUSernameScreen;