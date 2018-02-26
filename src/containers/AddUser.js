import { connect } from 'react-redux';
import UsersList from '../components/UsersList';
import { addUser } from "../actions/index";

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => {
    return ({
        dispatch : (userName) => {
            dispatch(addUser(userName));
        }
    });
}

export const AddUser = connect(mapStateToProps,mapDispatchToProps)(UsersList);