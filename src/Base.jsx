import React, { PropTypes } from 'react';
import Menu from './Menu.jsx';

class Base extends React.Component {

  render () {
    const { children } = this.props;
    return (
      <div className="mdl-layout mdl-layout--fixed-header">
        <Menu />
        <main className="mdl-layout__content">
          {children}
        </main>
      </div>
    )
  }
}

export default Base;
