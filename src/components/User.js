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
      <div>
        <button type="submit"
                onClick={this.signIn}
                className='userutton'>Login
        </button>
        <button type="submit"
                onClick={this.signOut}
                className='userbutton'>Sign Out
        </button>
        <p className='namedisplay'> Current User:
                                      { this.props.userName ?
                                        this.props.userName.displayName :
                                        " Guest"}
        </p>
      </div>
    )
  }
}


export default User
