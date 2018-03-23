import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const MessagesList = (props) => {
    return(
        <ul id="MessagesList" className="message-list">
            {props.messages.map(message => (<li key={message.id}>{message.author}: {message.message}</li>))}
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


const mapStateToProps = (state) => ({
    messages: state.messages
});

const mapDispatchToProps = () => ({});


export default connect(mapStateToProps,mapDispatchToProps)(MessagesList);


// export default MessagesList;