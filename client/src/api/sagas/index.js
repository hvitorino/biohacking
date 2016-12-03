import { fork } from 'redux-saga/effects';

import { watchEntities } from 'api/sagas/cruds.js';
import watchLogin from 'api/sagas/login.js';
import watchRegister from 'api/sagas/register.js';
import watchActivities, { saveActivities, updateActivities, deleteActivities } from 'api/sagas/activities.js';
import watchLogout from 'api/sagas/logout.js';
import watchReset from 'api/sagas/reset.js';
import changePassword from 'api/sagas/changePassword.js';
import rememberMe from 'api/sagas/rememberMe.js';
import search from 'api/sagas/search.js';
import swipe from 'api/sagas/swipe.js';

export default function* rootSaga() {
  yield fork(watchEntities);
  yield fork(watchLogin);
  yield fork(watchRegister);
  yield fork(watchActivities);
  yield fork(watchLogout);
  yield fork(watchReset);
  yield fork(changePassword);
  yield fork(rememberMe);
  yield fork(saveActivities);
  yield fork(updateActivities);
  yield fork(deleteActivities);
  yield fork(search);
  yield fork(swipe);
}
