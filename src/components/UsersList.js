import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


const UsersList = (props) => {
    return(
        <ul id="UsersList" className="users-list">
            {props.users.map(user => (<li key={user.id}>{user.userName}</li>))}
        </ul>
    );
}

UsersList.PropTypes = {
    users: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired
        }).isRequired
    ).isRequired
};

const mapStateToProps = (state) => ({
    users: state.users
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps,mapDispatchToProps)(UsersList);

// export default UsersList;