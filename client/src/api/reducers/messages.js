import { NAMESPACE } from 'api/actions.js';

export default (state = {}, { type, payload }) => {
  const keys = type.split('_');

  if (keys[0] === NAMESPACE) {
    return (type.match(/MESSAGE/g)) ? payload : {};
  }

  return state;
};
