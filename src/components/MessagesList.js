import React from 'react';
import PropTypes from 'prop-types';

const MessagesList = (messages) => {
    return(
        <ul id="MessagesList" class="message-list">
            {messages.map(message => <li key={message.id}>{message.author}: {message.message}</li>)}
        </ul>
    );
}

MessagesList.PropTypes = {
    messages: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            author: PropTypes.string.isRequired,
            message: PropTypes.string.isRequired
        }).isRequired
    ).isRequired
};

export default MessagesList;