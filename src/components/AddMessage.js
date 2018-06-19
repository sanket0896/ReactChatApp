import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addMessage } from "../actions/index";

const AddMessage = (props) => {
    let input;
    return(
        <input id="addMessage" 
        className="add-message"
        type="text"
        onKeyPress={(e) => {
            if(e.which===13){
                
            if(input.value.replace(/^\s*$/,"")!=="") //checking for inputs containing only white spaces
            {
                props.addMessage(input.value, "Me", props.selectedChat);
            }
            input.value='';
            }
        }}
        onBlur = {(e) => {e.target.focus()}}
        ref = {(node)=>{input = node}} autoFocus />
        
    );
}

AddMessage.PropTypes = {
    addMessage: PropTypes.func.isRequired,
    selectedChat: PropTypes.string.isRequired
};


const mapStateToProps = (state) => {
    return {
        selectedChat: state.selectedChat
    };
};

const mapDispatchToProps = (dispatch) => {
    return({
        addMessage : (message, author,target) => {
            dispatch(addMessage(message,author,target));
        }
    });
}

export default connect(mapStateToProps,mapDispatchToProps)(AddMessage);


// export default AddMessage;