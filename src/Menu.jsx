import React, { PropTypes } from 'react';

class Menu extends React.Component {
  render () {
    const { onLogout, email, onNew } = this.props;
    return (
      <div>
        <div>{email}</div>
        <button onClick={onNew}>Add</button>
        <div>
          <a className="mdl-navigation__link" onClick={onLogout}>Logout</a>
        </div>
      </div>
    )
  }
}

export default Menu;
