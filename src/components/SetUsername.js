import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { usernameSetSuccess, setUsername } from '../actions';

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
                }
            }}
            onBlur = {(e) => {e.target.focus()}}
            autoFocus />
        </div>
    );
}

SetUsername.PropTypes = {
    usernameSetSuccess: PropTypes.func.isRequired,
    setUsername: PropTypes.func.isRequired
};

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => {
    return ({
        usernameSetSuccess : () => {
            dispatch(usernameSetSuccess(true));
        },
        setUsername: (username) => {
            dispatch(setUsername(username));
        }
    });
}

export default connect(mapStateToProps,mapDispatchToProps)(SetUsername);