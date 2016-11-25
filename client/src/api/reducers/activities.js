import actions from 'api/actions.js';

export default (state = [], { type, payload }) => {
  console.log(type);
  if (type === actions.activities.requestSuccess) {
    return payload;
  }
  return state;
};
