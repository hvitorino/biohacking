import React, { PropTypes } from 'react';
import uuid from 'uuid';
import TextField from 'components/fields/TextField.jsx';

class Tags extends React.Component {
  render () {
    const { tags } = this.props;
    const container = tags.map(tag => (
      <div key={uuid()} className="tag">{tag}</div>
    ));
    return (
      <div className="Tags">
        {container}
        <TextField name="description" />
      </div>
    )
  }
}

export default Tags;
