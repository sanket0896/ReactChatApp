import { ADD_MESSAGE, SHOW_MESSAGE } from "../actions/ActionTypes";

let initialState = [];

const messages = (state = initialState, action) => {
    switch(action.type){
        case ADD_MESSAGE: 
            let newState = state.concat([{
                id: action.id,
                message: action.message,
                author: action.author
            }]);
            return newState;

        case SHOW_MESSAGE:
            newState = [];
            return newState.concat(action.messages);

        default: 
            return state;
    }
}

export default messages;