import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addMessage, sendUserTyping } from "../actions/index";

const WAIT_DURATION = 3000;
class AddMessage extends React.Component{

    state = {
        isUserTyping : false
    }

    componentWillMount(){
        this.timer = null;
    }

    setStartTyping = () => {
        this.setState({isUserTyping : true});
        this.props.sendUserTyping(this.props.selectedChat, true);
    }
    
    setStopTyping = () => {
        this.setState({isUserTyping : false});
        this.props.sendUserTyping(this.props.selectedChat, false);
    }

    handleKeyPress = (e) => {
        clearTimeout(this.timer);
        if(e.which===13){
            
            if(e.target.value.replace(/^\s*$/,"")!=="") //checking for inputs containing only white spaces
                {
                    this.props.addMessage(e.target.value, "Me", this.props.selectedChat);
                }
            e.target.value='';
            this.setStopTyping();
        }
        else{
            if(this.state.isUserTyping === false){
                this.setStartTyping();
            }
            this.timer = setTimeout(this.setStopTyping, WAIT_DURATION);
        }
    }
    // let input,isUserTyping;
    render(){
        let input;
        return(
            <input id="addMessage" 
            className="add-message"
            type="text"
            onKeyPress={e => this.handleKeyPress(e)}
            onBlur = {(e) => {e.target.focus()}}
            ref = {(node)=>{input = node}} autoFocus />
        );
    }
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
        addMessage : ( message, author,target ) => {
            dispatch(addMessage(message,author,target));
        },
        sendUserTyping : ( to, isTyping ) => {
            dispatch(sendUserTyping(to, isTyping));
        }
    });
}

export default connect(mapStateToProps,mapDispatchToProps)(AddMessage);


// export default AddMessage;