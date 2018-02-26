import React from 'react';
import PropTypes from 'prop-types';

const AddMessage = (props) => {
    let input;
    return(
        <input id="AddMessage" 
        class="add-message" 
        value="Snket" 
        type="text"
        onKeyPress={(e) => {
            if(e.which===13){
                props.dispatch(input.value,"me");
                input.value='';
            }
        }}
        ref = {(node)=>{input = node}}>

        
        </input>
    );
}

AddMessage.PropTypes = {
    dispatch: PropTypes.func.isRequired
};

export default AddMessage;