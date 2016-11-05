import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

class Login extends React.Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'USER_LOGIN'
    });
  }

  componentWillReceiveProps(nextProps) {
    debugger;
    if (nextProps.user.uid) {
      const { dispatch } = this.props;
      dispatch({
        type: 'USER_LOGGED'
      });
    }
  }

  render () {
    return (
      <div>Faça Login</div>
    );
  }
}

export default connect(({ user }) => ({ user }))(Login);
