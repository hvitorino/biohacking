import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import FormContainer from 'components/user/Form.jsx';
import TextField from 'components/fields/TextField.jsx';
import { doLoginAction } from 'api/actions';
import './Login.css';

class Login extends React.Component {

  componentDidMount() {
    const { doLogin } = this.props;
    doLogin();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.uid) {
      this.props.doRedirectAfterLogged();
    }
  }

  doLogin = (formState) => {
    const { doLogin } = this.props;
    doLogin(this.refs.form.getValues());
    event.preventDefault();
    event.stopPropagation();
  }

  createFieldContainer(name, fieldLabel, type = 'text') {
    let isValid = '';
    const { messages } = this.props;
    const errors = [];
    if (Array.isArray(messages)) {
      const filtered = messages.filter(({ path }) => (path === name));
      if (filtered.length) {
        isValid = 'is-invalid';
        filtered.forEach(({ message }) => errors.push(<div>{message}</div>));
      }
    }
    return (<TextField type={type} labelName={fieldLabel} name={name} />);
  }

  formatErrors = () => {
    const { errors } = this.props;
    return Object.keys(errors).map(key =>
      (<span key={key}>{errors[key]}</span>));
  }

  render () {
    const messages = this.formatErrors();
    return (
      <div>
        <div className="card-login-register mdl-card mdl-shadow--2dp">
          <div className="mdl-card__supporting-text">
            <div className="form-errors">{messages}</div>
            <FormContainer ref="form" onSubmit={this.doLogin}>
              <input type="hidden" name="_csrf" value={this.props.csrfToken} />
              <ul className="login-list mdl-list">
                <li className="mdl-list__item">
                  {this.createFieldContainer('email', 'Email')}
                </li>
                <li className="mdl-list__item">
                  {this.createFieldContainer('password', 'Password', 'password')}
                </li>
                <li className="mdl-list__item">
                  <button onClick={this.doLogin} type="button" className="mdl-button mdl-js-button mdl-button--raised">
                    Login
                  </button>
                  <a href="/reset/password" className="reset-password">
                    <i className="fa fa-key" aria-hidden="true" />
                    Reset
                  </a>
                </li>
              </ul>
            </FormContainer>
          </div>
          <div className="mdl-card__actions mdl-card--border">
            <a href="/auth/google" className="google-signin">
              <i className="fa fa-google-plus-square" aria-hidden="true" />
            </a>
          </div>
        </div>

      </div>
    );
  }
}

export default connect(({ user, errors }) => ({ user, errors }), doLoginAction)(Login);
