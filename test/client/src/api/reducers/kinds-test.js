import { describe, it, beforeEach } from 'mocha';
import { expect } from 'chai';
import actions from 'api/actions.js';
import kinds from 'api/reducers/kinds.js';

describe('Reducer kinds', function() {

  beforeEach(() => {
    this.payload = [{
      description: 'EAT'
    }];
    this.action = {
      type: actions.kinds.requestSucess,
      payload: this.payload
    };
  });

  it('should return payload value', () => {
    const resultado = kinds(null, this.action);
    expect(resultado).to.be.eql(this.payload);
  });

});
