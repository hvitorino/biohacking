import React, { Component } from 'react';
import firebase from 'firebase';
import './App.css';
import FormApp from 'components/Form.jsx';
import Activities from 'components/Activities.jsx';

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
    email: '',
    showForm: false,
    activities: [],
    activity: {},
  }

  configureFirebase = () => {

    const auth = new firebase.auth();

    auth.onAuthStateChanged(
      user => {
        if (user) {
          this.authUser({ user });
        } else {
          auth.signInWithPopup(this.createProvider())
            .then(this.authUser)
            .catch(this.catchError);
        }
      },
      error => {
        console.log(error);
        auth.signInWithPopup(this.createProvider())
        .then(this.authUser)
        .catch(this.catchError);
      }
    );

  }

  createProvider = () => {
    const provider = new window.firebase.auth.GoogleAuthProvider();
    provider.addScope('email');
    return provider;
  }

  authUser = ({ user }) => {
    const { email, displayName, photoURL, uid } = user;
    console.log("User", email, displayName, photoURL, uid );

    this.setState({ email }, () => {
      this.fetchActivities()
    });

  }

  fetchActivities = () => {
    const activities = window.firebase.database().ref('/activities');
    activities.once('value').then(list => {
      const json = list.val();
      const lista = Object.keys(json).map(key => json[key]);
      this.setState({
        ...this.state,
        activities: lista,
      });
    })
  }

  catchError = (error) => {
    console.log("Error", error);
  }

  add = () => {
    this.setState({
      ...this.state,
      showForm: true,
    });
  }

  restore = () => {
    this.setState({
      ...this.state,
      activity: {},
    }, () => {
      this.fetchActivities();
    });
  }

  onSave = (activity) => {
    const activities = window.firebase.database().ref(`/activities/${activity.id}`);
    activities
      .update(activity)
      .then(this.restore)
      .catch(this.catchError);
  }

  onEdit = (activity) => {
    this.setState({
      ...this.state,
      activity,
    })
  }

  onRemove = (activity) => {
    const activities = window.firebase.database().ref('/activities');
    activities
      .child(activity.id)
      .remove()
      .then(this.fetchActivities)
      .catch(this.catchError);
  }

  dispatch = (name, payload) => {
    if (name === 'onSave') {
      this.onSave(payload);
    }

    if (name === 'onEdit') {
      this.onEdit(payload);
    }

    if (name === 'onRemove') {
      this.onRemove(payload);
    }

  }

  componentDidMount() {
    this.configureFirebase();
  }

  render() {
    const { email, showForm } = this.state;
    const formStyle = {
      display: (showForm) ? 'block' : 'none',
    };
    const activities = this.state.activities.map(act => {
      const mode = (this.state.activity.id === act.id) ? 'edit' : '';
      return {
        ...act,
        mode,
      }
    }, this);
    return (
      <div className="App">
        <div>
          <h2>Curso na SEPOG</h2>
          <div>
            <button onClick={this.add}>Adicionar</button>
            <FormApp
              style={formStyle}
              onSave={this.onSave}
            />
          </div>
          Olá {email}, seja bem vindo!
        </div>
        <div>
          <Activities
            dispatch={this.dispatch}
            activities={activities}/>
        </div>
      </div>
    );
  }
}

export default App;
