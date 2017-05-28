import {fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer'

describe('reducer', ()=> {
  it('handles SET_MOVIES', () => {
    const initialState = fromJS({});
    const action = {type: 'SET_MOVIES', entries: ['Trainspotting']};
    const nextState = reducer(initialState, action);
    const expectedState = fromJS({movies: ['Trainspotting']});

    expect(nextState).to.equal(expectedState);
  });

  it('handles NEXT', () => {
    const initialState = fromJS({
      entries: ['Trainspotting', '28 Days Later']
    });
    const action = {type: 'NEXT'};
    const nextState = reducer(initialState, action);
    const expectedState = fromJS({
      vote:{
        pair:[
          'Trainspotting', '28 Days Later'
        ]
      },
      entries: []
    });
    expect(nextState).to.equal(expectedState);
  });
  it('handles VOTE', () => {
    const initialState = fromJS({
      vote: {
        pair: ['Trainspotting', '28 Days Later']
      },
      entries: []
    });
    const action = {type: 'VOTE', entry: 'Trainspotting'};
    const nextState = reducer(initialState, action);
    const expectedState = fromJS({
      vote:{
        pair:[
          'Trainspotting', '28 Days Later'
        ],
        tally: {Trainspotting: 1}
      },
      entries: []
    });
    expect(nextState).to.equal(expectedState);
  });

}); // describe('reducer')
