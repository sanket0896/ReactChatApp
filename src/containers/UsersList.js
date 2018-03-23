import { connect } from 'react-redux';
import UsersListComponent from '../components/UsersList';
import { showUsers } from "../actions/index";

const mapStateToProps = (state) => ({
    users:"stay"
});

const mapDispatchToProps = () => {};

console.log("running");


export default connect(mapStateToProps,mapDispatchToProps)(UsersListComponent);