import {fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer'

describe('reducer', ()=> {

  //...

  it('can be used with reduce', () => {
    const actions = [
      {type: 'SET_MOVIES', movies: ['Trainspotting', '28 Days Later']},
      {type: 'NEXT'},
      {type: 'VOTE', entry: 'Trainspotting'},
      {type: 'VOTE', entry: '28 Days Later'},
      {type: 'VOTE', entry: 'Trainspotting'},
      {type: 'NEXT'}
    ];
    const finalState = actions.reduce(reducer, fromJS());
    const expectedState = fromJS({winner: 'Trainspotting'})

    expect(finalState).to.equal(expectedState);
  })

  it('has an initial state', ()=> {
    const action = {type: 'SET_MOVIES', movies:['Trainspotting']};
    const nextState = reducer(undefined, action);
    const expectedState = fromJS({
      movies:['Trainspotting']
    })
    expect(nextState).to.equal(expectedState)
  });

  it('handles SET_MOVIES', () => {
    const initialState = fromJS({});
    const action = {type: 'SET_MOVIES', movies: ['Trainspotting']};
    const nextState = reducer(initialState, action);
    const expectedState = fromJS({movies: ['Trainspotting']});

    expect(nextState).to.equal(expectedState);
  });

  it('handles NEXT', () => {
    const initialState = fromJS({
      movies: ['Trainspotting', '28 Days Later']
    });
    const action = {type: 'NEXT'};
    const nextState = reducer(initialState, action);
    const expectedState = fromJS({
      vote:{
        pair:[
          'Trainspotting', '28 Days Later'
        ]
      },
      movies: []
    });
    expect(nextState).to.equal(expectedState);
  });
  it('handles VOTE', () => {
    const initialState = fromJS({
      vote: {
        pair: ['Trainspotting', '28 Days Later']
      },
      movies: []
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
      movies: []
    });
    expect(nextState).to.equal(expectedState);
  });

}); // describe('reducer')
