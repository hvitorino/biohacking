export default (state = [], { type, payload }) => {
  if (type === 'ACTIVITIES_REQUEST_SUCCESS' || type === 'ACTIVITY_UPDATE_SUCCESS') {
    return payload;
  }
  return state;
}
