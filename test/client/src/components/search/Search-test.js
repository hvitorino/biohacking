import React from 'react';
import Immutable from 'immutable';
import { describe, beforeEach, it } from 'mocha';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { spy } from 'sinon';

import { Search } from 'components/search/Search.jsx';
import Filter from 'components/search/Filter.jsx';

describe('Container: Search', function() {

  beforeEach(() => {
    const activities = Immutable.List([]);
    this.clean = spy(() => {});
    this.search = shallow(
      <Search
        clean={this.clean}
        activities={activities}
      />
    )
  })

  it('Contains Filter', () => {
    expect(this.search.contains(<Filter />)).to.equal(true);
  })

  it('Clean was called', () => {
    expect(this.clean.called).to.equal(true);
  })

});
