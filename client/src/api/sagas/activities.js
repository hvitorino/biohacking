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
  const payload = yield call(defaultFetch, '/api/activities', action.payload);
  const { error, messages } = payload;
  if (error || messages) {
    yield put(failure(error || messages));
    yield put(push('/login'));
  } else {
    yield put({ type: actions.activities.requestSuccess, payload });
  }
}

export function* updateSaga(action) {
  const payload = yield call(defaultFetch, '/api/activities', action.payload, 'PUT');
  const { error } = payload;
  if (error) {
    yield put(failure(error));
    yield put(push('/login'));
  } else {
    yield put({ type: actions.activities.updateSuccess, payload });
  }
}

export function* saveSaga(action) {
  const payload = yield call(defaultFetch, '/api/activities', action.payload, 'POST');
  const { error } = payload;
  if (error) {
    yield put(failure(error));
    yield put(push('/login'));
  } else {
    yield put(push('/activities'));
  }
}

export function* deleteSaga(action) {
  const payload = yield call(defaultFetch, '/api/activities', action.payload, 'DELETE');
  const { error } = payload;
  if (error) {
    yield put(failure(error));
    yield put(push('/login'));
  } else {
    yield put({ type: actions.activities.deleteSuccess, payload });
  }
}

export function* updateActivities() {
  yield* takeLatest(actions.activities.update, updateSaga);
}

export function* saveActivities() {
  yield* takeLatest(actions.activities.create, saveSaga);
}

export function* deleteActivities() {
  yield* takeLatest(actions.activities.delete, deleteSaga);
}

export default function* watchActivities() {
  yield* takeLatest(actions.activities.request, prepareSaga);
}
