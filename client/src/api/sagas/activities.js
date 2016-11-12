import fetch from 'isomorphic-fetch';
import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import actions from 'api/actions';

function executeFetch(payload) {
  return fetch('api/activities', {
    method: 'POST',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).then(response => {
      if (response.status >= 400) {
        return response.json().then(({messages}) => {
          const error = messages.reduce((errors, message) => {
            errors[message.path] = message;
            return errors;
          }, {});
          return { error };
        });
      }
      return response.json();
    })
    .then(json => json);
}

const failure = payload => ({
  type: actions.user.registerFailure,
  payload,
});

export function* prepareSaga(action) {
  console.log('Entrou na saga Activities:', action);
  const payload = yield call(executeFetch, action.payload);
  console.log(payload);
  const { error } = payload;
  if (error) {
    yield put(failure(error));
  } else {
    yield put({ type: actions.activities.updateSuccess, payload });
    yield put(failure({}));
    yield put(push('/activities'));
  }
}

export default function* watchActivities() {
  yield* takeLatest(actions.activities.update, prepareSaga);
}
