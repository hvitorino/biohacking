export default (state = {}, { type, payload }) => {
  if (type.match(/ERROR/g)) {
    return payload;
  }
  return state;
}
