import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { doLoginAction } from 'api/actions';
import Users from 'components/user/Users.jsx';

class Register extends Users {

  doSubmit = (formState) => {
    const { doRegister } = this.props;
    doRegister(this.refs.form.getValues());
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
            Register
          </button>
          <Link className="reset-password" to="/reset/password">
            <i className="fa fa-key" aria-hidden="true" />
            Reset
          </Link>
          <Link className="login" to="/login">
            <i className="fa fa-sign-in" aria-hidden="true" />
            Login
          </Link>
        </li>
      </ul>
    )
  }

}

export default connect(({ user, errors, messages }) => ({ user, errors, messages }), doLoginAction)(Register);
