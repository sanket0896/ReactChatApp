import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectChat, unhighlightUser } from '../actions';


// const UsersList = (props) => {

class UsersList extends Component{

    componentDidMount= () => {
        // document.getElementsByClassName("user-name")[this.props.selectedUserIndex].classList.add("selected");
    }

    addClasses = (isHighlighted) => {
        let classes = ["user-name"];

        if(isHighlighted){
            classes.push("highlighted");
        }

        return classes.join(" ");
    }

    handleClick = (e,userName,isHighlighted) => {
        if(document.getElementsByClassName("selected").length){
            document.querySelector(".selected").classList.remove("selected");
        }
        e.target.classList.add("selected");
        this.props.selectChat(userName);      
        if(isHighlighted){
            this.props.unhighlightUser(userName);
        }         
    }

    render(){
        return(
            <ul id="UsersList" className="users-list">
                {
                this.props.users.map((user,key) => (<li key={user.id} id={key} username={user.userName} onClick={(e)=>this.handleClick(e,user.userName,user.isHighlighted)} className={this.addClasses(user.isHighlighted)}>
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
    users: state.users
});

const mapDispatchToProps = (dispatch) => ({
    selectChat: (userName) => {
        dispatch(selectChat(userName));
    },
    unhighlightUser: (userName) => {
        dispatch(unhighlightUser(userName));
    }
});

export default connect(mapStateToProps,mapDispatchToProps)(UsersList);

// export default UsersList;