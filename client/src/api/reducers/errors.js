import { NAMESPACE } from 'api/actions.js';

export default (state = {}, { type, payload }) => {
  const keys = type.split('_');
  if (keys[0] === NAMESPACE) {
    return (type.match(/ERROR/g)) ? payload : {};
  }
  return state;
};
