import React from 'react';

export default ({ description }) => {
  const pattern = /\#([^\s]+)/g;

  const tags = description.replace(pattern, function(a, b) {
    return `<div class='tag'>${a}</div>`;
  });

  return <div
    className="description"
    dangerouslySetInnerHTML={{ __html: tags }}
  />

}
