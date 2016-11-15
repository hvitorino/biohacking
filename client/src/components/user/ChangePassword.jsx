import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Users from 'components/user/Users.jsx';
import { doChangeAction } from 'api/actions';

class ChangePassword extends Users {

  static propTypes = {
    params: PropTypes.object.isRequired,
  }

  componentDidMount() {
    const { params: { token } } = this.props;
    this.refs.form.setValues({ token });
  }

  createContainer() {
    return (
      <ul className="login-list mdl-list">
        {this.createFieldContainer('token', '', 'hidden')}
        <li className="mdl-list__item">
          {this.createFieldContainer('password', 'Password', 'password')}
        </li>
        <li className="mdl-list__item">
          <button onClick={this.doSubmit} type="button" className="mdl-button mdl-js-button mdl-button--raised">
            Reset
          </button>
        </li>
      </ul>
    );
  }
}

export default connect(({ errors, messages }) => ({ errors, messages }), doChangeAction)(ChangePassword);
