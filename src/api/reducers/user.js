export default (state = {}, { type, payload }) => {
  if (type === 'USER_LOADED') {
    return payload;
  }
  return state;
}
