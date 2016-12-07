import { takeLatest } from 'redux-saga';
import { push } from 'react-router-redux';
import { put, select } from 'redux-saga/effects';
import actions from 'api/actions';

function* swipeSaga({ type }) {
  const getLocation = state => state.routing.locationBeforeTransitions;
  const location = yield select(getLocation);

  if (type === actions.swipe.left) {
    if (location.pathname === '/activities') {
      yield put(push('/new'));
    } else if (location.pathname === '/search') {
      yield put(push('/activities'));
    }
  }
  if (type === actions.swipe.right) {
    if (location.pathname === '/new') {
      yield put(push('/activities'));
    } else if (location.pathname === '/activities') {
      yield put(push('/search'));
    }
  }
}

export default function* swipe() {
  yield* takeLatest([actions.swipe.right, actions.swipe.left], swipeSaga);
}
