import React, { PropTypes } from 'react';

const Tags = ({ tags }) => {
  const list = tags.map((tag, index) => (
    <div key={`tag-${index}`} className="tag">{tag}</div>
  ));

  return (
    <div className="description">
      {list}
    </div>
  );
};

Tags.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string),
};

export default Tags;
