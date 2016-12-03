/* Polyfill */
import 'whatwg-fetch';
/* Dependencias de monitoramento e integração */
import 'global/config.js';
/* Ecossistema React */
import React, { Component } from 'react';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { IndexRedirect, Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
/* Components e Containers */
import Base from 'Base.jsx';
import Grid from 'components/kinds/Grid.jsx';
import Activities from 'components/activities/Activities.jsx';
import Search from 'components/search/Search.jsx';
import Login from 'components/user/Login.jsx';
import Register from 'components/user/Register.jsx';
import ResetPassword from 'components/user/ResetPassword.jsx';
import ChangePassword from 'components/user/ChangePassword.jsx';
/* API */
import BioMiddleware from 'api/middlewares/BioMiddleware.js';
import ApiReducers from 'api/reducers';
import Sagas from 'api/sagas';
import actions from 'api/actions.js';

/* */
import './App.css';

class App extends Component {

  logPageView = () => {
    window.ReactGA.set({ page: window.location.pathname });
    window.ReactGA.pageview(window.location.pathname);
  }

  render() {
    const sagaMiddleware = createSagaMiddleware({
      onError: (error) => {
        window.airbrake.notify(error);
      },
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
      compose(applyMiddleware(...middlewares)),
    );

    const loggedUser = localStorage.getItem('user');
    if (loggedUser) {
      store.dispatch({
        type: actions.user.logged,
        payload: JSON.parse(loggedUser),
      });
    }

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
            <Route path="/search" component={Search} onEnter={validateUser} onUpdate={this.logPageView} />
            <Route path="/activities" component={Activities} onEnter={validateUser} onUpdate={this.logPageView} />
            <Route path="/new" component={Grid} onEnter={validateUser} onUpdate={this.logPageView} />
          </Route>
          <Route path="/login" component={Login} onUpdate={this.logPageView} />
          <Route path="/register" component={Register} onUpdate={this.logPageView} />
          <Route path="/reset/password" component={ResetPassword} onUpdate={this.logPageView} />
          <Route path="/token/:token" component={ChangePassword} onUpdate={this.logPageView} />
        </Router>
      </Provider>
    );
  }
}

export default App;
