import React, { PropTypes } from 'react';
import Menu from './Menu.jsx';

class Base extends React.Component {

  render () {
    const { children } = this.props;
    return (
      <div className="App">
        <div>
          <Menu />
          {children}
        </div>
      </div>
    )
  }
}

export default Base;
