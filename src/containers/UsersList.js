import { connect } from 'react-redux';
import UsersList from '../components/UsersList';
import { showUsers } from "../actions/index";

const mapStateToProps = (state) => ({
    userName: state.userName,
    id: state.id
});

const mapDispatchToProps = () => ({});

console.log("Hello");

export const UsersList = connect(mapStateToProps,mapDispatchToProps)(UsersList);