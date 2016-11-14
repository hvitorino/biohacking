import { NAMESPACE } from 'api/actions';

export default (state = {}, { type, payload }) => {

  const keys = type.split('_');

  if (keys[0] === NAMESPACE) {
    if (type.match(/MESSAGE/g)) {
      return payload;
    } else {
      return {};
    }    
  }

  return state;
}
