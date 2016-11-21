import React, { PropTypes } from 'react';
import uuid from 'uuid';
import TextField from 'components/fields/TextField.jsx';

class Tags extends React.Component {

  static childContextTypes = {
    updateForm: PropTypes.func,
  }

  state = {
    description: '',
    selectedTags: {},
  }

  getChildContext() {
    return {
      updateForm: this.updateForm,
    };
  }

  onTagClick = (event) => {
    const { selectedTags, description } = this.state;
    const value = event.target.innerText;

    if (!!selectedTags[value]) {
      const desc = description.replace(`${selectedTags[value]}`, '');
      delete selectedTags[value];
      this.setState({
        description: desc,
        selectedTags,
      });
    } else {
      const desc = description.concat(` ${value}`);
      const newTags = {
        ...selectedTags,
        [value]: value,
      };
      this.setState({
        description: desc,
        selectedTags: newTags,
      });
    }
  }

  updateForm = (fieldName, description) => {
    this.setState({
      ...this.state,
      description,
    });
  }

  render() {
    const { tags } = this.props;
    const { selectedTags, description } = this.state;
    const container = tags.map((tag) => {
      const tagClass = selectedTags[tag] ? 'tag-selected' : '';
      return (<div key={uuid()} className={`tag ${tagClass}`} onClick={this.onTagClick}>{tag}</div>);
    });
    return (
      <div className="Tags">
        {container}
        <TextField name="description" value={description} />
      </div>
    );
  }
}

export default Tags;
