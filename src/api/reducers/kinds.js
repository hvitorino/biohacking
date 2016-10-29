export default (state = [], { type, payload }) => {
  if (type === 'KINDS_REQUEST_SUCCESS') {
    return payload;
  }
  return state;
}
