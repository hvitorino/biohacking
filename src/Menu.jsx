import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

class Menu extends React.Component {

  onLogout = () => {
    const { dispatch } = this.props;
    dispatch({ type: 'USER_LOGOUT' });
  }

  render () {
    const { user: { email } } = this.props;
    return (
      <header className="mdl-layout__header mdl-layout__header--transparent">
        <div className="mdl-layout__header-row">
          <span className="mdl-layout-title">Biohacking</span>
          <div className="mdl-layout-spacer"></div>
          <nav className="mdl-navigation">
            <Link className="mdl-navigation__link" to="/activities">Today</Link>
            <Link className="mdl-navigation__link" to="/new">Add</Link>
            <a className="mdl-navigation__link" onClick={this.onLogout}>Logout</a>
          </nav>
        </div>
      </header>
    )
  }
}

export default connect(({ user }) => ({ user }))(Menu);
