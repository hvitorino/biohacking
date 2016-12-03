import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Hammer from 'react-hammerjs';
import Menu from 'Menu.jsx';
import actions from 'api/actions';

class Base extends React.Component {

  static propTypes = {
    children: PropTypes.element,
    onSwipeLeft:  PropTypes.func,
    onSwipeRight:  PropTypes.func,
  }

  render () {
    const { children, onSwipeLeft, onSwipeRight } = this.props;
    return (
      <Hammer onSwipeLeft={onSwipeLeft} onSwipeRight={onSwipeRight}>
        <div className="mdl-layout mdl-layout--fixed-header">
          <Menu />
          <main className="mdl-layout__content">
            {children}
          </main>
        </div>
      </Hammer>
    )
  }
}

export default connect(null, (dispatch) => {
  return {
    onSwipeLeft: () => dispatch({ type: actions.swipe.left }),
    onSwipeRight: () => dispatch({ type: actions.swipe.right }),
  }
})(Base);
