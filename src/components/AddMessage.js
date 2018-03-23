import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addMessage } from "../actions/index";

const AddMessage = (props) => {
    let input;
    return(
        <input id="AddMessage" 
        className="add-message"
        type="text"
        onKeyPress={(e) => {
            if(e.which===13){
                props.dispatch(input.value,"me");
                input.value=' ';
            }
        }}
        ref = {(node)=>{input = node}}>

        
        </input>
    );
}

AddMessage.PropTypes = {
    dispatch: PropTypes.func.isRequired
};


const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => {
    return({
        dispatch : (message, author) => {
            dispatch(addMessage(message,author));
        }
    });
}

export default connect(mapStateToProps,mapDispatchToProps)(AddMessage);


// export default AddMessage;