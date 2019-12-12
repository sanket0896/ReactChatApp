import React from 'react';
import UsersList from '../UsersList/UsersList';
import './UserPane.css';

const UserPane = (props) => {
    return (
        <div className="user-pane">
            <div className="online">Online Users</div>
            <UsersList />
        </div>
    );
}

export default UserPane;