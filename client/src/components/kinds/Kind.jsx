import React, { PropTypes } from 'react';
import Tags from 'components/kinds/Tags.jsx';

class Kind extends React.Component {

  state = {
    content: '',
    selectedTags: {},
  }

  static childContextTypes = {
    updateForm: PropTypes.func,
  }

  getChildContext() {
    return {
      updateForm: this.updateForm,
    };
  }

  updateForm = (fieldName, value) => {
    const { content, selectedTags } = this.state;
    if (fieldName === 'tags') {
      if (!!selectedTags[value]) {
        const newDesc = content.replace(`${selectedTags[value]}`, '');
        delete selectedTags[value];
        this.setState({
            content: newDesc,
            selectedTags,
        });
      } else {
        const newDesc = content.concat(` ${value}`);
        const newTags = {
          ...selectedTags,
          [value]: value,
        };
        this.setState({
            content: newDesc,
            selectedTags : newTags,
        });
      }

    } else {
      this.setState({
          ...this.state,
          content: value,
      });
    }
  }

  onSave = (event) => {
    const { onSave } = this.props;
    const { content } = this.state;
    onSave(this.props.id, content);
  }

  render () {
    const { tags, color, description, onSave } = this.props;
    const { selectedTags, content } = this.state;
    const style = {
      backgroundColor: color,
    }
    return (
      <div style={style} className="Kind">
        <button onClick={onSave} className="mdl-button description" onClick={this.onSave}>{description}</button>
        <Tags tags={tags} selectedTags={selectedTags} content={content} />
      </div>
    );
  }
}

export default Kind;
