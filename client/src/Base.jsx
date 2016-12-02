import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Hammer from 'react-hammerjs';
import Menu from 'Menu.jsx';

class Base extends React.Component {

  static propTypes = {
    children: PropTypes.element,
    onSwipeLeft:  PropTypes.func,
    onSwipeRight:  PropTypes.func,
  }

  // onSwipeLeft = () => {
  //   if (this.props.location.pathname === '/activities') {
  //     this.context.router.push('/new');
  //   } else if (this.props.location.pathname === '/search') {
  //     this.context.router.push('/activities');
  //   }
  // }
  //
  // onSwipeRight = () => {
  //   if (this.props.location.pathname === '/new') {
  //     this.context.router.push('/activities');
  //   } else if (this.props.location.pathname === '/activities') {
  //     this.context.router.push('/search');
  //   }
  // }

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
    onSwipeLeft: () => dispatch({ type: 'GO_LEFT' }),
    onSwipeRight: () => dispatch({ type: 'GO_RIGHT' }),
  }
})(Base);
