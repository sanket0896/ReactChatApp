import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { sendMsgRead } from '../../actions';
import Message from '../Message/Message';
import './MessagesList.css';

class MessagesList extends React.Component {

    TYPING_MESSAGE = {
        author: "",
        id: "xce0d9", // random id
        message: "Typing...",
        status: "NONE",
    }

    scrollToBottom = () => {
        this.dummy.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
    }

    getCurrentChatHistory = (selectedChat,chatHistory) => {
        let currentChatHistory = chatHistory.find((chat)=>(chat.chattingWith===selectedChat));
        
        if(currentChatHistory===undefined)
            return [];
        else{
            return currentChatHistory.messages;
        }

    }

    isUserTyping = (selectedChat, chatHistory) => {
        let currentChatHistory = chatHistory.find((chat)=>(chat.chattingWith===selectedChat));

        if(currentChatHistory===undefined)
            return false;
        else{
            return currentChatHistory.isTyping;
        }
    }

    componentDidMount = () => {
        this.scrollToBottom();
    }

    componentDidUpdate = () => {
        this.scrollToBottom();
    }
    render(){

        return(
            <div className="msg-container">
                <ul id="MessagesList" className="message-list">
                    {
                        this.getCurrentChatHistory(this.props.selectedChat,this.props.chatHistory)
                        .map(message => {
                            return (
                                <Message key={message.id} messageData={{...message}} />
                            );
                        })
                    }
                    {
                        this.isUserTyping(this.props.selectedChat,this.props.chatHistory) && 
                        <Message messageData={{
                            ...this.TYPING_MESSAGE, author: this.props.selectedChat
                        }} />
                    }
                </ul>
                <div className="dummy-div" ref={(node)=>{this.dummy=node}}></div> 
            </div>
        );
    }
}

MessagesList.PropTypes = {
    messages: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            author: PropTypes.string.isRequired,
            message: PropTypes.string.isRequired
        }).isRequired
    ).isRequired,
    chatHistory: PropTypes.arrayOf(
        PropTypes.shape({
            chattingWith: PropTypes.string.isRequired,
            messages: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.number.isRequired,
                    author: PropTypes.string.isRequired,
                    message: PropTypes.string.isRequired
                }).isRequired
            ).isRequired
        }).isRequired            
    ).isRequired,
    selectedChat: PropTypes.string.isRequired
};


const mapStateToProps = (state) => ({
    messages: state.messages,
    selectedChat: state.selectedChat,
    chatHistory: state.chatHistory
});

const mapDispatchToProps = (dispatch) => ({
    sendMsgRead: ( to, msgId ) => {
        dispatch(sendMsgRead( to, msgId ));
    }
});


export default connect(mapStateToProps,mapDispatchToProps)(MessagesList);


// export default MessagesList;