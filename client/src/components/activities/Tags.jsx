import React from 'react';

export default ({ tags }) => {

  const list = tags.map((tag, index) => (
    <div key={`tag-${index}`} className='tag'>{tag}</div>
  ));

  return (
    <div className="description">
      {list}
    </div>
  )

}
