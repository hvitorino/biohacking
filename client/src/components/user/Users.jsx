import React, { PropTypes } from 'react';
import FormContainer from 'components/user/Form.jsx';
import TextField from 'components/fields/TextField.jsx';
import './Login.css';

class Users extends React.Component {

  doSubmit() {}

  createContainer() {
    return (<div></div>);
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
    return Object.keys(errors).map(key => {
      const error = errors[key];
      const message = (typeof error !== 'string') ? error.message : error;
      return (<span key={key}>{message}</span>)
    });
  }

  formatMessages = () => {
    const { messages } = this.props;
    return Object.keys(messages).map(key => {
      const warning = messages[key];
      const message = (typeof warning !== 'string') ? warning.message : warning;
      return (
        <span className="mdl-color-text--primary" key={key}>{message}</span>
      )
    });
  }

  render () {
    const errors = this.formatErrors();
    const messages = this.formatMessages();
    const container = this.createContainer();
    return (
      <div className="mdl-layout mdl-layout--fixed-header">
        <main className="mdl-layout__content">
          <div className="card-login-register mdl-card mdl-shadow--2dp">
            <div className="mdl-card__supporting-text">
              <div className="form-errors">{errors}</div>
              <div className="form-warnings">{messages}</div>
              <FormContainer ref="form" onSubmit={this.doSubmit}>
                {container}
              </FormContainer>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default Users;
