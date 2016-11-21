import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import actions from 'api/actions';
import defaultFetch from 'api/sagas/fetch/defaultFetch.js';

const failure = payload => ({
  type: actions.user.registerFailure,
  payload,
});

export function* prepareSaga(action) {
  console.log('Entrou na saga REGISTER:', action);
  const payload = yield call(defaultFetch, '/api/register', action.payload, 'POST');
  const { error } = payload;
  if (error) {
    yield put(failure(error));
  } else {
    yield put({ type: actions.user.logged, payload });
    yield put(push('/'));
  }
}

export default function* watchRegister() {
  yield* takeLatest(actions.user.register, prepareSaga);
}
