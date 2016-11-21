import React, { PropTypes } from 'react';
import Tags from 'components/kinds/Tags.jsx';

class Kind extends React.Component {

  static propTypes = {
    onSave: PropTypes.func,
    tags: PropTypes.arrayOf(PropTypes.string),
    color: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.number,
  }

  onSave = () => {
    const { onSave, id } = this.props;
    const { state: { description } } = this.tagsContainer;
    onSave(id, description);
  }

  render() {
    const { tags, color, description } = this.props;
    const style = {
      backgroundColor: color,
    };
    return (
      <div style={style} className="Kind">
        <button className="mdl-button description" onClick={this.onSave}>{description}</button>
        <Tags ref={(container) => { this.tagsContainer = container; }} tags={tags} />
      </div>
    );
  }
}

export default Kind;
