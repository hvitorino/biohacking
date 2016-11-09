import actions from 'api/actions';

export default (state = {}, { type, payload }) => {
  if (type === actions.user.loaded) {
    return payload;
  }
  return state;
}
