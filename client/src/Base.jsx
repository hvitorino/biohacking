import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Hammer from 'react-hammerjs';
import Menu from 'Menu.jsx';
import actions from 'api/actions';

const Base = ({ children, onSwipeLeft, onSwipeRight }) => (
  <Hammer onSwipeLeft={onSwipeLeft} onSwipeRight={onSwipeRight}>
    <div className="mdl-layout mdl-layout--fixed-header">
      <Menu />
      <main className="mdl-layout__content">
        {children}
      </main>
    </div>
  </Hammer>
);

Base.propTypes = {
  children: PropTypes.element,
  onSwipeLeft: PropTypes.func,
  onSwipeRight: PropTypes.func,
};

export default connect(null, dispatch => (
  {
    onSwipeLeft: () => dispatch({ type: actions.swipe.left }),
    onSwipeRight: () => dispatch({ type: actions.swipe.right }),
  }
))(Base);
