import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { doLoginAction } from 'api/actions';
import Users from 'components/user/Users.jsx';

class ResetPassword extends Users {

  doSubmit = (formState) => {
    const { doReset } = this.props;
    doReset(this.refs.form.getValues());
  }

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
    )
  }

}

export default connect(({ errors, messages }) => ({ errors, messages }), doLoginAction)(ResetPassword);
