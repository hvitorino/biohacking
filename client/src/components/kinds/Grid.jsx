import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { kindsAction } from 'api/actions';

class Grid extends React.Component {

  componentDidMount() {
    this.props.doRequest();
  }

  render() {
    return (
      <div>Grid</div>
    )
  }
}

export default connect(({ kinds }) => ({ kinds }), kindsAction)(Grid);
