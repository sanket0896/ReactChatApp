import React from 'react';
import { connect } from 'react-redux';
import { sendMsgRead, msgNone } from '../../actions';
import readreceipt from '../../utils/ReadReceiptStatus';
import './Message.css';

class Message extends React.Component {

    componentWillMount(){
        if (this.props.messageData.status === readreceipt.UNREAD && this.props.messageData.author.toLowerCase() !== "me") {
            this.props.sendMsgRead(this.props.messageData.author, this.props.messageData.id);
            this.props.msgNone(this.props.messageData.author, this.props.messageData.id);
        }
    }

    getReadStatus(status){
        if(status === readreceipt.NONE || status === readreceipt.CREATED || status === readreceipt.UNREAD){
            return "";
        }else{
            return status;
        }
    }

    setLiClassName = (author) => (
        author.toLowerCase() === "me" ? "me" : "not-me"
    )

    render(){
        return (
            <li id={this.props.messageData.id} className={"msg "+this.setLiClassName(this.props.messageData.author)} >
                <div className="msg-author">{this.props.messageData.author.toLowerCase() === "me" ? "Me" : this.props.messageData.author[0]}</div>
                <div className="msg-text">{this.props.messageData.message}</div>
                <div className="msg-status">{this.getReadStatus(this.props.messageData.status)}</div>
            </li>
        );
    }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
    sendMsgRead: ( to, msgId ) => {
        dispatch(sendMsgRead( to, msgId ));
    },
    msgNone: ( chattingWith, msgId) => {
        dispatch( msgNone( chattingWith, msgId ));
    }
});


export default connect(mapStateToProps,mapDispatchToProps)(Message);