import { connect } from 'react-redux';
import UsersListComponent from '../components/UsersList';
import { showUsers } from "../actions/index";

const mapStateToProps = (state) => ({
    users:"stay"
});

const mapDispatchToProps = () => {};

export default connect(mapStateToProps,mapDispatchToProps)(UsersListComponent);