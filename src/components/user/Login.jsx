import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

class Login extends React.Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'USER_LOGIN'
    });
  }

  render () {

    const { user } = this.props;
    const container = (user.uid) ?
      <a href="/activities">Já está logado {user.email}, clique no link</a> :
      <div>Faça Login</div>

    return (
      <div>{container}</div>
    );
  }
}

export default connect(({ user }) => ({ user }))(Login);
