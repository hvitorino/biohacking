import { fork } from 'redux-saga/effects';

import { watchEntities } from 'api/sagas/cruds.js';
import watchLogin from 'api/sagas/login.js';
import watchRegister from 'api/sagas/register.js';
import watchActivities from 'api/sagas/activities.js';
import watchLogout from 'api/sagas/logout.js';
import watchReset from 'api/sagas/reset.js';
import changePassword from 'api/sagas/changePassword.js';
import rememberMe from 'api/sagas/rememberMe.js';

export default function* rootSaga() {
  yield fork(watchEntities);
  yield fork(watchLogin);
  yield fork(watchRegister);
  yield fork(watchActivities);
  yield fork(watchLogout);
  yield fork(watchReset);
  yield fork(changePassword);
  yield fork(rememberMe);
}
