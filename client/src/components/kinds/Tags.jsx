import React, { PropTypes } from 'react';
import uuid from 'uuid';
import TextField from 'components/fields/TextField.jsx';

class Tags extends React.Component {
  static contextTypes = {
    updateForm: PropTypes.func,
  }

  onTagClick = (event) => {
    const tag = event.target.innerText;
    const { updateForm } = this.context;
    updateForm('tags', tag);
  }

  render () {
    const { tags,selectedTags, content } = this.props;
    const { updateForm } = this.context;
    const container = tags.map(tag => {
      const tagClass = selectedTags[tag] ? "tag-selected" : "";

      return <div key={uuid()} className={`tag ${tagClass}`} onClick={this.onTagClick}>{tag}</div>
    });
    return (
      <div className="Tags">
        {container}
        <TextField name="description" value={content} />
      </div>
    )
  }
}

export default Tags;
