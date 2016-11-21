import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Container from 'components/user/Container.jsx';
import { doChangeAction } from 'api/actions.js';
import mapStateToProps from 'components/user/mapStateToProps.js';

class ChangePassword extends Container {

  static propTypes = {
    params: PropTypes.shape({
      token: PropTypes.string,
    }),
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

export default connect(mapStateToProps, doChangeAction)(ChangePassword);
