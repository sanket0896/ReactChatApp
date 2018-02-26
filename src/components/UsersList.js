import React from 'react';
import PropTypes from 'prop-types';


const UsersList = (props) => {
    console.log(props);
    return(
        <ul id="UsersList" class="users-list">
            {props.map(user => (<li key={user.id}>{user.userName}</li>))}
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

export default UsersList;