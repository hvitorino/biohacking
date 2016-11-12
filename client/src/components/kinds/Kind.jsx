import React from 'react';
import Tags from 'components/kinds/Tags.jsx';

export default ({tags, color, description}) => {
  const style = {
    backgroundColor: color,
  }
  return (
    <div style={style} className="Kind">
      <button className="mdl-button description">{description}</button>
      <Tags tags={tags} />
    </div>
  )
}
