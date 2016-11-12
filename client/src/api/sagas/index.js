import { fork } from 'redux-saga/effects';

import { watchEntities } from 'api/sagas/cruds.js';
import watchLogin from 'api/sagas/login.js';

export default function* rootSaga() {
  yield fork(watchEntities);
  yield fork(watchLogin);
}
