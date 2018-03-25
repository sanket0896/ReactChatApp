import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectUser } from '../actions';


// const UsersList = (props) => {

class UsersList extends Component{

    componentDidMount= () => {
        document.getElementsByClassName("user-name")[this.props.selectedUserIndex].classList.add("selected");
    }

    handleClick = (e,key) => {
        if(document.getElementsByClassName("selected").length){
            document.querySelector(".selected").classList.remove("selected");
        }
        e.target.classList.add("selected");
        this.props.dispatch(key);               
    }

    render(){
        return(
            <ul id="UsersList" className="users-list">
                {this.props.users.map((user,key) => (<li key={user.id} onClick={(e)=>this.handleClick(e,key)} className="user-name">
                    {user.userName}
                </li>))}
            </ul>
        );
    }
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
    users: state.users,
    selectedUserIndex: state.selectedUserIndex
});

const mapDispatchToProps = (dispatch) => ({
    dispatch: (key) => {
        dispatch(selectUser(key));
    }
});

export default connect(mapStateToProps,mapDispatchToProps)(UsersList);

// export default UsersList;