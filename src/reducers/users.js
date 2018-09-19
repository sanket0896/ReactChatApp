import { ADD_USER, SHOW_USERS, HIGHLIGHT_USER, REMOVE_USER } from "../actions/ActionTypes";

let initialState = [];

const users = (state = initialState , action) => {
    let newState;
    
    switch(action.type){
        case ADD_USER:
            newState = state.concat([{
                id: action.userId,
                userName: action.userName,
                isHighlighted: false
            }]);
            return newState;

        case SHOW_USERS: 
            newState = [...state];            
            newState = newState.concat(action.users);
            newState = newState.map((user)=>{
                user["isHighlighted"]=false;
                return user;
            });            
            return newState;

        case REMOVE_USER:
            newState = [...state];
            return newState.filter((user)=>(user.userName!==action.user.userName));
                
        case HIGHLIGHT_USER:
            newState = [...state];
            newState.forEach((user)=>{
                if(user.userName===action.userName)
                    user.isHighlighted = true;
                return user;
            });            
            return newState;

        default: 
            return state;
    }
}

export default users;