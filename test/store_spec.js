import {fromJS} from 'immutable';
import {expect} from 'chai';

import makeStore from '../src/store';

describe('store', () => {
  it('is a Redux store configured with the correct reucer', () => {
    const store = makeStore();
    expect(store.getState()).to.equal(fromJS({}));

    store.dispatch({
      type: 'SET_MOVIES',
      movies: ['Trainspotting', '28 Days Later']
    });
    const nextMovies = from({movies: ['Trainspotting', '28 Days Later']});
    expect(store.getState()).to.equal(nextMovies);
  });
})//describe('store')
