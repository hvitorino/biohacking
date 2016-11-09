import { fork } from 'redux-saga/effects';

import { watchEntities } from './cruds.js';

export default function* rootSaga() {
  yield fork(watchEntities);
}
