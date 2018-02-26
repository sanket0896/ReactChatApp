import { connect } from 'react-redux';
import UsersListComponent from '../components/UsersList';
import { showUsers } from "../actions/index";

const mapStateToProps = (state) => ({
    users:state.users
});

const mapDispatchToProps = () => ({});

console.log("Hello");

export const UsersList = connect(mapStateToProps,mapDispatchToProps)(UsersListComponent);