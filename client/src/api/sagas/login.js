import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import actions from 'api/actions';
import defaultFetch from 'api/sagas/fetch/defaultFetch.js';

const failure = payload => ({
  type: actions.user.loginFailure,
  payload,
});

export function* prepareSaga(action) {
  console.log('Entrou na saga LOGIN:', action);
  const payload = yield call(defaultFetch, '/api/login', action.payload, 'POST');
  const { error } = payload;
  if (error) {
    yield put(failure(error));
  } else {
    localStorage.setItem('user', JSON.stringify(payload));
    yield put({ type: actions.user.logged, payload });
    yield put(push('/'));
  }
}

export default function* watchLogin() {
  yield* takeLatest(actions.user.login, prepareSaga);
}
