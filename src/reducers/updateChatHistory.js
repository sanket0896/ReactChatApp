import { ADD_MESSAGE, SHOW_MESSAGE, MSG_UPLOADED, MSG_RECEIVED, MSG_READ, MSG_NONE, USER_TYPING } from "../actions/ActionTypes";
import readReceipt from "../utils/ReadReceiptStatus";

let initialState = [];
/**
 * [{
 *  chattingWith: String,
 *  isTyping: Bool,
 *  messages: [{
 *          id: String
 *          message: String
 *          author: String
 *          status: Enum
 *      }]
 * }]
 */

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
                        author: action.author,
                        status: action.status
                    }); 
                    
            }
            else{
                newState = state.concat([{
                    chattingWith: action.target,
                    isTyping: false,
                    messages:[{
                        id: action.id,
                        message: action.message,
                        author: action.author,
                        status: action.status
                    }]
                }]); 
            }
            return newState;

        case SHOW_MESSAGE:
            newState = [];
            return newState.concat(action.messages);

        case MSG_UPLOADED:
            newState = state.map(chat => {
                if(chat.chattingWith === action.chattingWith){
                    /* using for to seach in reverse order because latest 
                       messages will certainly be towards end of the array */
                    for (let index = chat.messages.length - 1; index >= 0; index--) {
                        let msg = chat.messages[index];
                        if (msg.id === action.localMsgId) {
                            msg.id = action.serverMsgId;
                            msg.status = readReceipt.UPLOADED;
                            break;
                        }
                    }    
                }
                return chat;
            });
            return newState;
            
        case MSG_RECEIVED:
            newState = state.map(chat => {
                if(chat.chattingWith === action.chattingWith){
                    /* using for to seach in reverse order because latest 
                    messages will certainly be towards end of the array */
                    for (let index = chat.messages.length - 1; index >= 0; index--) {
                        let msg = chat.messages[index];
                        if (msg.id === action.msgId) {
                            msg.status = readReceipt.RECEIVED;
                            break;
                        }
                    }    
                }
                return chat;
            });
            return newState;

        case MSG_READ:
            newState = state.map(chat => {
                if(chat.chattingWith === action.chattingWith){
                    /* using for to seach in reverse order because latest 
                    messages will certainly be towards end of the array */
                    for (let index = chat.messages.length - 1; index >= 0; index--) {
                        let msg = chat.messages[index];
                        if (msg.id === action.msgId) {
                            msg.status = readReceipt.READ;
                            break;
                        }
                    }    
                }
                return chat;
            });
            return newState;

        case MSG_NONE:
            newState = state.map(chat => {
                if(chat.chattingWith === action.chattingWith){
                    /* using for to seach in reverse order because latest 
                    messages will certainly be towards end of the array */
                    for (let index = chat.messages.length - 1; index >= 0; index--) {
                        let msg = chat.messages[index];
                        if (msg.id === action.msgId) {
                            msg.status = readReceipt.NONE;
                            break;
                        }
                    }    
                }
                return chat;
            });
            return newState;

        case USER_TYPING:
            newState = state.map(chat => {
                if(chat.chattingWith === action.chattingWith){
                    chat.isTyping = action.isTyping;
                }
                return chat;
            });
            
            return newState;

        default: 
            return state;
    }
}

export default updateChatHistory;