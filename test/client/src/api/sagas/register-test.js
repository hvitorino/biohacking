import { describe, it, beforeEach } from 'mocha';
import { expect } from 'chai';
import fetchMock from 'fetch-mock';
import { call, put } from 'redux-saga/effects';
import watchRegister, { prepareSaga, failure } from 'api/sagas/register.js';
import defaultFetch from 'api/sagas/fetch/defaultFetch.js';
import actions from 'api/actions';

describe(`
    Dado que a action register foi disparada
    Quando a saga watchRegister
    Então deveria acionar o ajax
  `, function() {

    beforeEach(() => {
      this.url = '/api/register';
      this.method = 'POST';
      fetchMock.mock(this.url, []).catch(503);
    })

    describe('prepareSaga', () => {

      it('should call defaultFetch in prepareSaga', () => {
        const payload = {
          email: 'cmilfont@gmail.com',
          password: 'amor0303eterno',
        };
        const iterator = prepareSaga({ payload });
        expect(iterator.next().value)
          .to
          .deep
          .eql(
            call(defaultFetch, this.url, payload, this.method)
          );
      });

      it('should put payload to store', () => {
        const data = [{
          id: 10,
          email: 'cmilfont@gmail.com',
          password: 'amor0303eterno',
        }];
        const iterator = prepareSaga({ payload: {} });
        iterator.next();
        expect(iterator.next(data).value)
          .to
          .deep
          .eql(
            put({
              type: actions.user.logged,
              payload: data
            })
          );
      });

    })

});
