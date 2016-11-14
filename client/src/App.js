import 'whatwg-fetch';

import React, { Component } from 'react';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { IndexRedirect, Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import firebase from 'firebase';
import './App.css';

import Base from 'Base.jsx';

import Grid from 'components/kinds/Grid.jsx';

import Activities from 'components/activities/Activities.jsx';
import Search from 'components/activities/Search.jsx';
import Login from 'components/user/Login.jsx';
import Register from 'components/user/Register.jsx';
import ResetPassword from 'components/user/ResetPassword.jsx';

import BioMiddleware from 'api/middlewares/BioMiddleware.js';
import ApiReducers from 'api/reducers';
import Sagas from 'api/sagas';

//import Airbrake from 'airbrake-js';

var config = {
  apiKey: "AIzaSyAwFULDzJxhy67MYf5tMTMD3ygQh2pZGks",
  authDomain: "biohacking-ca69d.firebaseapp.com",
  databaseURL: "https://biohacking-ca69d.firebaseio.com",
  storageBucket: "biohacking-ca69d.appspot.com",
  messagingSenderId: "730944460815"
};

window.firebase = firebase;
window.firebase.initializeApp(config);

// const AIRBRAKE_API_KEY='4a68026f35d09256a77ae10fd065bab2';
// const AIRBRAKE_PROJECT_ID=133132;
//
// const airbrake = new Airbrake({
//   projectId: AIRBRAKE_PROJECT_ID,
//   projectKey: AIRBRAKE_API_KEY,
// });

class App extends Component {

  render() {

    const sagaMiddleware = createSagaMiddleware({
      onError: (error) => {
        console.error('ERROR: ', error);
        //airbrake.notify(error);
      }
    });

    const reducers = combineReducers({
      routing: routerReducer,
      ...ApiReducers,
    });

    const middlewares = [
      routerMiddleware(browserHistory),
      sagaMiddleware,
      BioMiddleware,
    ];

    const store = createStore(
      reducers,
      compose(applyMiddleware(...middlewares))
    );

    const history = syncHistoryWithStore(browserHistory, store);

    const validateUser = (nextState, replace, callback) => {
      const { user } = store.getState();
      if (user && !user.id) {
        replace('/login');
      }
      callback();
    };

    sagaMiddleware.run(Sagas);

    return (
      <Provider store={store}>
        <Router history={history}>
          <Route path="/" component={Base}>
            <IndexRedirect to="/activities" />
            <Route path="/search" component={Search} onEnter={validateUser} />
            <Route path="/activities" component={Activities} onEnter={validateUser} />
            <Route path="/new" component={Grid} onEnter={validateUser} />
          </Route>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/reset/password" component={ResetPassword} />
        </Router>
      </Provider>
    );
  }
}

export default App;
