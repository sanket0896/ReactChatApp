import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { usernameSetSuccess, setUsername, getMessages } from '../actions';

const SetUsername = (props) => {
    let input;
    return (
        <div id="setUsernameScreen" className="set-username-screen">
            <h1 className="set-usrname-prompt">Hi there! Please enter your name.</h1>
            <input type="text" name="name" id="username"
            onKeyPress={(e)=>{
                if(e.which === 13){
                    props.setUsername(e.target.value)
                    props.usernameSetSuccess(true);
                    props.getMessages();
                }
            }}
            onBlur = {(e) => {e.target.focus()}}
            autoFocus />
        </div>
    );
}

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => {
    return ({
        usernameSetSuccess : () => {
            dispatch(usernameSetSuccess(true));
        },
        setUsername: (username) => {
            dispatch(setUsername(username));
        },
        getMessages: () => {
            dispatch(getMessages());
        }
    });
}

SetUsername.PropTypes = {
    usernameSetSuccess : PropTypes.func.isRequired,
    setUsername : PropTypes.func.isRequired,
    showMessages : PropTypes.func.isRequired 
};

export default connect(mapStateToProps,mapDispatchToProps)(SetUsername);