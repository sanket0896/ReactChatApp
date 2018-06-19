import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class MessagesList extends React.Component {

    scrollToBottom = () => {
        this.dummy.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
    }

    setLiClassName = (author) => (
        author === "Me" ? "me" : "not-me"
    )

    getCurrentChatHistory = (selectedChat,chatHistory) => {
        let currentChatHistory = chatHistory.find((chat)=>(chat.chattingWith===selectedChat));

        if(currentChatHistory===undefined)
            return [];
        else{
            return currentChatHistory.messages;
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
                    {this.getCurrentChatHistory(this.props.selectedChat,this.props.chatHistory).map(message => (<li key={message.id} className={this.setLiClassName(message.author)} >{message.author}: {message.message}</li>))}
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

const mapDispatchToProps = () => ({});


export default connect(mapStateToProps,mapDispatchToProps)(MessagesList);


// export default MessagesList;