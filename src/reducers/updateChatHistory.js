import { ADD_MESSAGE, SHOW_MESSAGE } from "../actions/ActionTypes";

let initialState = [];

const updateChatHistory = (state = initialState, action) => {


    switch(action.type){
        case ADD_MESSAGE: 
            let newState;
            let isChatPresent = state.find((chat)=>(chat.chattingWith === action.target));

            if (isChatPresent) {
                newState = [...state];
                let index = newState.findIndex((chat)=>(chat.chattingWith === action.target));
                newState[index].messages.push({
                        id: action.id,
                        message: action.message,
                        author: action.author
                    }); 
                    
            }
            else{
                newState = state.concat([{
                    chattingWith: action.target,
                    messages:[{
                        id: action.id,
                        message: action.message,
                        author: action.author
                    }]
                }]); 
            }
            return newState;

        case SHOW_MESSAGE:
            newState = [];
            return newState.concat(action.messages);

        default: 
            return state;
    }
}

export default updateChatHistory;