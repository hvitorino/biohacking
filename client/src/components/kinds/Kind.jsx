import React, { PropTypes } from 'react';
import Tags from 'components/kinds/Tags.jsx';

class Kind extends React.Component {

  onSave = (event) => {
    const { onSave, id } = this.props;
    const { tags : { state : { description } } } = this.refs;
    onSave(id, description);
  }

  render () {
    const { tags, color, description, onSave } = this.props;
    const style = {
      backgroundColor: color,
    }
    return (
      <div style={style} className="Kind">
        <button className="mdl-button description" onClick={this.onSave}>{description}</button>
        <Tags ref="tags" tags={tags} />
      </div>
    );
  }
}

export default Kind;
