import { connect } from 'react-redux';
import MessagesList from '../components/MessagesList';
import { showUsers } from "../actions/index";

const mapStateToProps = (state) => ({
    message: state.message,
    author: state.author
});

const mapDispatchToProps = () => ({});


export const MessagesList = connect(mapStateToProps,mapDispatchToProps)(MessagesList);