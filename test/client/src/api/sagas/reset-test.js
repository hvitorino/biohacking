import { describe, it, beforeEach } from 'mocha';
import { expect } from 'chai';
import actions from 'api/actions.js';
import watchReset, { prepareSaga, failure } from 'api/sagas/reset.js';
import defaultFetch from 'api/sagas/fetch/defaultFetch.js';
import fetchMock from 'fetch-mock';
import { call, put } from 'redux-saga/effects';
//import { push } from 'react-router-redux';

describe('Saga reset', function() {

  beforeEach(() => {
    this.method = 'POST';
    this.url = '/api/reset/password';
    this.data = [];
    fetchMock.mock(this.url, []).catch(503);
  });

  afterEach(() => {
    fetchMock.restore();
  });

  it('should call defaultFetch in prepareSaga', () => {
    const data = [];
    const payload = { token: '2342ddwfwe' };
    const iterator = prepareSaga({ payload });
    expect(iterator.next().value).to.deep.eql(
      call(defaultFetch, this.url, payload, this.method)
    );
  });

    it('should put payload to store', () => {
      const data = [];
      const payload = { token: '2342ddwfwe' };
      const iterator = prepareSaga({ payload });
      iterator.next();
      expect(iterator.next(data).value).to.deep.eql(
        put({
          type: actions.user.hasBeenReset,
          payload: data
        })
      );

  });

});
