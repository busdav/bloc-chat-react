import React, { Component } from 'react';

class User extends Component {

  constructor(props) {
    super(props);

    this.state = {
    }
  }


  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged( user => {
      this.props.setActiveUser(user);
    });
  }


  signIn(e) {
    e.preventDefault();
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup(provider).then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
    }).catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }

  signOut(e) {
    e.preventDefault();
    this.props.firebase.auth().signOut();
  }


  render() {

    return (
      <div className="user-authentication">
        <div className="button-signin">
          <button type="button" className="btn btn-primary" onClick={(e) => this.signIn(e)}>Sign in</button>
        </div>
        <div className="button-signout">
          <button type="button" className="btn btn-danger" onClick={(e) => this.signOut(e)}>Sign out</button>
        </div>
        <div className="display-username">
          { this.props.activeUser ? this.props.activeUser.displayName : 'Guest' }
        </div>
      </div>
    );
  }
}

export default User;

