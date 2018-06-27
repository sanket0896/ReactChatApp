import { SET_USERNAME } from "../actions/ActionTypes";

let initialState = {
    name: null,
    userName: null
};

const handleUSernameScreen = (state = initialState , action) => {
    let newState = {...state};
    
    switch(action.type){
        case SET_USERNAME:
            newState = action.name!==null?{...newState,name:action.name}:newState;
            newState = action.userName!==null?{...newState,userName:action.userName}:newState;
            return newState;
        default:
            return state;
    }
}

export default handleUSernameScreen;