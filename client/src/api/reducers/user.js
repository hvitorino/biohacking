import actions from 'api/actions.js';

export default (state = {}, { type, payload }) => {
  if (type === (actions.user.logged || actions.user.loaded)) {
    return payload;
  }

  if (type === actions.user.hasBeenReset) {
    return {};
  }

  return state;
};
