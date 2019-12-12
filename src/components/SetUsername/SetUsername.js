import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setUsername } from '../../actions';
import "./SetUsername.css";

const SetUsername = (props) => {
    let name=null,username = null;

    /**
     * isEnterKeySimulated param is used to simulate enter key press so that this function can be reused
     */
    const handleKeyPress = (e,isEnterKeySimulated) => {
        if(e.which === 13 || isEnterKeySimulated === true){
            if(e.target.value.replace(/^\s*$/,"")!=="") //checking for inputs containing only white spaces
            { 
                if (e.target.name === 'name') {
                    
                    name = e.target.value;
                    document.getElementById("name-prompt-status").innerHTML = "";
                    if(username!==null){
                        props.setUsername(name,username);
                    }
                    else{
                        document.getElementById("username").focus();
                    }
                }
                else if (e.target.name === 'username') {
                    username = e.target.value;
                    if(name===null){
                        document.getElementById("name-prompt-status").innerHTML = "Please enter your name.";
                        document.getElementById("name").focus();
                        return;
                    }
                    else{
                        props.setUsername(name,username);
                        if(props.isUsernameAvailable===false){
                            e.target.value = ''; 
                        }
                    }
                }                
            }                   
        }
    }
    return (
        <div id="setUsernameScreen" className="set-username-screen">

            <h2 className="set-details-prompt">Hi there! Please enter your Name.</h2>
            <input type="text" name="name" id="name"
            onKeyPress={(e)=>{handleKeyPress(e)}} 
            onBlur={(e)=>{
                handleKeyPress(e,true);}} autoFocus required />
            <span className="error" id="name-prompt-status"></span>

            <h2 className="set-details-prompt">Hi there! Please enter your Username.</h2>
            <input type="text" name="username" id="username"
            onKeyPress={(e)=>{handleKeyPress(e)}} required />
            <span className="error" id="userName-prompt-status">{props.isUsernameAvailable===false?"This username is taken!":""}</span>
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
        setUsername: (name,username) => {
            dispatch(setUsername(name,username));
        }
    });
}

export default connect(mapStateToProps,mapDispatchToProps)(SetUsername);