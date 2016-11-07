import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { doLogoutAction } from 'api/actions';

class Menu extends React.Component {

  onLogout = () => {
    const { doLogout } = this.props;
    doLogout();
  }

  render () {
    const { user: { email } } = this.props;
    return (
      <header className="mdl-layout__header mdl-layout__header--transparent">
        <div className="mdl-layout__header-row">
          <span className="mdl-layout-title">Biohacking</span>
          <div className="mdl-layout-spacer"></div>
          <nav className="mdl-navigation">
            <Link className="mdl-navigation__link" to="/search">
              <i className="material-icons">search</i>
            </Link>
            <Link className="mdl-navigation__link" to="/activities">
              <i className="material-icons">today</i>
            </Link>
            <Link className="mdl-navigation__link" to="/new">
              <i className="material-icons">add_circle</i>
            </Link>
            <a className="mdl-navigation__link" onClick={this.onLogout}>
              <i className="fa fa-sign-out" aria-hidden="true"></i>
            </a>
          </nav>
        </div>
      </header>
    )
  }
}

export default connect(({ user }) => ({ user }), doLogoutAction)(Menu);
