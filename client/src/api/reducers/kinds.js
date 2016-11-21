import actions from 'api/actions.js';

export default (state = [], { type, payload }) => {
  if (type === actions.kinds.requestSucess) {
    return payload;
  }
  return state;
};
