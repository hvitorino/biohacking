import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

class Menu extends React.Component {

  onNew = () => this.context.router.push('/new')

  onLogout = () => {
    const { dispatch } = this.props;
    dispatch({ type: 'USER_LOGOUT' });
  }

  render () {
    const { user: { email } } = this.props;
    const onNew = this.onNew.bind(this);
    return (
      <div>
        <div>{email}</div>
        <button onClick={onNew}>Add</button>
        <div>
          <a className="mdl-navigation__link" onClick={this.onLogout}>Logout</a>
        </div>
      </div>
    )
  }
}

export default connect(({ user }) => ({ user }))(Menu);
