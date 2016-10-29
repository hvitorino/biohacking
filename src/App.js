import React, { Component } from 'react';
import firebase from 'firebase';
import './App.css';
import Activities from 'components/Activities.jsx';
import Menu from './Menu.jsx';

window.firebase = firebase;
var config = {
  apiKey: "AIzaSyAwFULDzJxhy67MYf5tMTMD3ygQh2pZGks",
  authDomain: "biohacking-ca69d.firebaseapp.com",
  databaseURL: "https://biohacking-ca69d.firebaseio.com",
  storageBucket: "biohacking-ca69d.appspot.com",
  messagingSenderId: "730944460815"
};
window.firebase.initializeApp(config);

class App extends Component {

  state = {
    email: null
  }

  authUser = ({ user }) => {
    const { email, displayName, photoURL, uid } = user;
    console.log("User", email, displayName, photoURL, uid );
    this.setState({ email });
  }

  callGoogle = () => {
    const auth = new firebase.auth();
    const provider = new window.firebase.auth.GoogleAuthProvider();
    provider.addScope('email');
    auth.signInWithPopup(provider).then(this.authUser);
  }

  componentDidMount() {
    const auth = new firebase.auth();
    auth.onAuthStateChanged(
      user => {
        if (user) {
          this.authUser({ user });
        } else {
          this.callGoogle();
        }
      },
      this.callGoogle
    );
  }

  onLogout = () => {
    window.firebase.auth().signOut().then(function() {
      this.setState({
        email: ''
      });
    }, function(error) {
      console.log("Error", error);
    });
  }

  render() {
    const { email } = this.state;
    return (
      <div className="App">
        <div>
          <Menu email={email} onLogout={this.onLogout} />
          <Activities email={email} />
        </div>
      </div>
    );
  }
}

export default App;
