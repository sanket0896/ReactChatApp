import { connect } from 'react-redux';
import MessagesListComponent from '../components/MessagesList';
import { showUsers } from "../actions/index";

const mapStateToProps = (state) => ({
    messages: state.messages
});

const mapDispatchToProps = () => {};


export default connect(mapStateToProps,mapDispatchToProps)(MessagesListComponent);