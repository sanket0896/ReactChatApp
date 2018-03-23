import { connect } from 'react-redux';
import AddMessageComponent from '../components/AddMessage';
import { addMessage } from "../actions/index";

const mapStateToProps = () => {};

const mapDispatchToProps = (dispatch) => {
    return({
        dispatch : (message, author) => {
            dispatch(addMessage(message,author));
        }
    });
}

export default connect(mapStateToProps,mapDispatchToProps)(AddMessageComponent);