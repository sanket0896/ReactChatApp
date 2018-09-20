import React from 'react';
import { connect } from 'react-redux';
import { sendMsgRead, msgNone } from '../actions';
import readreceipt from '../utils/ReadReceiptStatus';

class Message extends React.Component {

    componentWillMount(){
        if (this.props.messageData.status === readreceipt.UNREAD && this.props.messageData.author.toLowerCase() !== "me") {
            this.props.sendMsgRead(this.props.messageData.author, this.props.messageData.id);
            this.props.msgNone(this.props.messageData.author, this.props.messageData.id);
        }
    }

    setLiClassName = (author) => (
        author.toLowerCase() === "me" ? "me" : "not-me"
    )

    render(){
        return (
            <li id={this.props.messageData.id} className={this.setLiClassName(this.props.messageData.author)} >
                {this.props.messageData.author}: {this.props.messageData.message}
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