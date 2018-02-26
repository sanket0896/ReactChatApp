import React from 'react';
import MessagesList from './MessagesList';
import AddMessage from './AddMessage';

const MessagePane = (props) => {
    return (
        <div className="message-pane">
            <MessagesList />
            <AddMessage />
        </div>
    );
}

export default MessagePane;