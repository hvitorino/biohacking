import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { doLoginAction } from 'api/actions.js';
import Container from 'components/user/Container.jsx';
import mapStateToProps from 'components/user/mapStateToProps.js';

class Login extends Container {

  componentDidMount() {
    this.props.doRemember();
  }

  createContainer() {
    return (
      <ul className="login-list mdl-list">
        <li className="mdl-list__item">
          {this.createFieldContainer('email', 'Email')}
        </li>
        <li className="mdl-list__item">
          {this.createFieldContainer('password', 'Password', 'password')}
        </li>
        <li className="mdl-list__item">
          <button onClick={this.doSubmit} type="button" className="mdl-button mdl-js-button mdl-button--raised">
            Login
          </button>
          <Link className="reset-password" to="/reset/password">
            <i className="fa fa-key" aria-hidden="true" />
            Reset
          </Link>
          <Link className="register" to="/register">
            <i className="fa fa-user-plus" aria-hidden="true" />
            Register
          </Link>
        </li>
      </ul>
    );
  }

}

export default connect(mapStateToProps, doLoginAction)(Login);
