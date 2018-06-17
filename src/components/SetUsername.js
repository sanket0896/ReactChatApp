import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { usernameSetSuccess, setUsername } from '../actions';

const SetUsername = (props) => {
    let input;
    return (
        <div id="setUsernameScreen" className="set-username-screen">
            <h1 className="set-usrname-prompt">Hi there! Please enter your username.</h1>
            <input type="text" name="name" id="username"
            onKeyPress={(e)=>{
                if(e.which === 13){
                    if(input.value.replace(/^\s*$/,"")!=="") //checking for inputs containing only white spaces
                    {
                        props.setUsername(e.target.value);
                    }   
                    input.value = '';                 
                }
            }}
            onBlur = {(e) => {e.target.focus()}}
            autoFocus 
            ref = {(node) => {input = node}}/>
            <span className="error" >{props.isUsernameAvailable===false?"This username is taken!":""}</span>
        </div>
    );
}

SetUsername.PropTypes = {
    setUsername: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    isUsernameAvailable: state.usernameSetSuccess
});

const mapDispatchToProps = (dispatch) => {
    return ({
        setUsername: (username) => {
            dispatch(setUsername(username));
        }
    });
}

export default connect(mapStateToProps,mapDispatchToProps)(SetUsername);