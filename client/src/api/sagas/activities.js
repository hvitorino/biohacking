import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import actions from 'api/actions';
import defaultFetch from 'api/sagas/fetch/defaultFetch.js';

const failure = payload => ({
  type: actions.user.requestFailure,
  payload,
});

export function* prepareSaga(action) {
  console.log('Entrou na saga Activities:', action);
  const payload = yield call(defaultFetch, '/api/activities', action.payload);
  console.log(payload);
  const { error, messages } = payload;
  if (error || messages) {
    yield put(failure(error || messages));
    yield put(push('/login'));
  } else {
    yield put({ type: actions.activities.requestSuccess, payload });
  }
}

export function* saveSaga(action) {
  console.log('Entrou na saga Activities SAVE:', action);
  const payload = yield call(defaultFetch, '/api/activities', action.payload, 'POST');
  console.log(payload);
  const { error } = payload;
  if (error) {
    yield put(failure(error));
    yield put(push('/login'));
  } else {
    //yield put({ type: actions.activities.createSuccess, payload });
    yield put(push('/activities'));
  }
}

export function* saveActivities() {
  yield* takeLatest(actions.activities.create, saveSaga);
}

export default function* watchActivities() {
  yield* takeLatest(actions.activities.request, prepareSaga);
}
