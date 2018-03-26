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
                props.dispatch(input.value,"Me");
                input.value=' ';
            }
        }}
        onBlur = {(e) => {e.target.focus()}}
        ref = {(node)=>{input = node}} autoFocus />
        
    );
}

AddMessage.PropTypes = {
    dispatch: PropTypes.func.isRequired
};


const mapStateToProps = () => {
    // let index = state.selectedUserIndex;
    // return {userName: state.users[index].userName};
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return({
        dispatch : (message, author) => {
            dispatch(addMessage(message,author));
        }
    });
}

export default connect(mapStateToProps,mapDispatchToProps)(AddMessage);


// export default AddMessage;