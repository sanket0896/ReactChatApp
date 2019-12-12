import React from 'react';
import MessagesList from '../MessagesList/MessagesList';
import AddMessage from '../AddMessage/AddMessage';
import './MessagePane.css';

const MessagePane = (props) => {
    return (
        <div className="message-pane">
            <MessagesList />
            <AddMessage />
        </div>
    );
}

export default MessagePane;