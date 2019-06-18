import React, { Component } from 'react';

class User extends Component {

  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged( user => {
      this.props.setUser(user);
    });

  }

  signIn = () => {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup( provider );
    this.props.logIn();
  }

  signOut = () => {
    this.props.firebase.auth().signOut();
    this.props.logOut();
  }

  render() {
    return (
      <div className="mainuserform">
      { this.props.userName ?
        <button type="submit"
                onClick={this.signOut}
                className='signoutbutton'>Sign Out
        </button> :
        <button type="submit"
                onClick={this.signIn}
                className='loginbutton'>Login
        </button>
      }
        <p className='namedisplay'> { this.props.userName ?
                                      'Current User: ' + this.props.userName.displayName :
                                      'Logged Out'}

        </p>
      </div>
    )
  }
}


export default User
