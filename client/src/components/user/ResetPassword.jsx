import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { doResetAction } from 'api/actions';
import Container from 'components/user/Container.jsx';
import mapStateToProps from 'components/user/mapStateToProps.js';

class ResetPassword extends Container {

  createContainer() {
    return (
      <ul className="login-list mdl-list">
        <li className="mdl-list__item">
          {this.createFieldContainer('email', 'Email')}
        </li>
        <li className="mdl-list__item">
          <button onClick={this.doSubmit} type="button" className="mdl-button mdl-js-button mdl-button--raised">
            Reset
          </button>
          <Link className="login" to="/login">
            <i className="fa fa-sign-in" aria-hidden="true" />
            Login
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

export default connect(mapStateToProps, doResetAction)(ResetPassword);
