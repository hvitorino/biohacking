import React, { Component } from 'react';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { IndexRedirect, Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux';
import firebase from 'firebase';
import './App.css';

import Base from './Base.jsx';
import ActivityForm from './components/Form.jsx';

import Activities from 'components/Activities.jsx';
import Login from 'components/user/Login.jsx';

import BioMiddleware from 'api/middlewares/BioMiddleware.js';
import ApiReducers from 'api/reducers';

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

  // // authUser = ({ user }) => {
  // //   const { email, displayName, photoURL, uid } = user;
  // //   console.log("User", email, displayName, photoURL, uid );
  // //   this.setState({ email });
  // // }
  // //
  // // callGoogle = () => {
  // //   const auth = new firebase.auth();
  // //   const provider = new window.firebase.auth.GoogleAuthProvider();
  // //   provider.addScope('email');
  // //   auth.signInWithPopup(provider).then(this.authUser);
  // // }

  render() {

    const reducers = combineReducers({
      routing: routerReducer,
      ...ApiReducers,
    });

    const middlewares = [
      routerMiddleware(browserHistory),
      BioMiddleware,
    ];

    const store = createStore(
      reducers,
      compose(applyMiddleware(...middlewares))
    );

    const history = syncHistoryWithStore(browserHistory, store);

    const validateUser = (nextState, replace, callback) => {
      const { user } = store.getState();
      if (user && !user.uid) {
        replace('/login');
      }
      callback();
    };

    return (
      <Provider store={store}>
        <Router history={history}>
          <Route path="/" component={Base}>
            <IndexRedirect to="/activities" />
            <Route path="/activities" component={Activities} onEnter={validateUser} />
            <Route path="/new" component={ActivityForm} onEnter={validateUser} />
          </Route>
          <Route path="/login" component={Login} />
        </Router>
      </Provider>
    );
  }
}

export default App;
