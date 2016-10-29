export default (state = [], { type, payload }) => {
  if (type === 'ACTIVITIES_REQUEST_SUCCESS') {
    return payload;
  }
  return state;
}
