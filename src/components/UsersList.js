import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectChat } from '../actions';


// const UsersList = (props) => {

class UsersList extends Component{

    componentDidMount= () => {
        // document.getElementsByClassName("user-name")[this.props.selectedUserIndex].classList.add("selected");
    }

    addClasses = (classes,isHighlighted) => {
        let newClasses = classes;
        
        
        if(isHighlighted){
            newClasses.push("highlighted");
        }

        return newClasses.join(" ");
    }

    handleClick = (e,userName,isHighlighted) => {
        if(document.getElementsByClassName("selected").length){
            document.querySelector(".selected").classList.remove("selected");
        }
        e.target.className = this.addClasses(["user-name","selected"]);
        this.props.selectChat(userName);
    }

    render(){
        return(
            <ul id="UsersList" className="users-list">
                {
                this.props.users.map((user,key) => (<li key={user.id} id={key} username={user.userName} onClick={(e)=>this.handleClick(e,user.userName,user.isHighlighted)} className={this.addClasses(["user-name"],user.isHighlighted)}>
                    {user.name}: @{user.userName} 
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
    }
});

export default connect(mapStateToProps,mapDispatchToProps)(UsersList);

// export default UsersList;