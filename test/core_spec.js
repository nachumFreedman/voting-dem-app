import { expect } from 'chai';
import { fromJS } from 'immutable';
import {
  addNigger,
  setNiggers,
  next,
  vote,
} from '../src/core'

describe('application logic', () => {

  // ..

  describe( 'vote', () => {

    it('crates a tally for the voted entry', () => {
      const state = fromJS({
        vote:{
          pair:[
            'Jamal',
            'Jaquan',
          ]},
        });
        const nextState = vote(state, 'Jamal')
        expect(nextState).to.euqal(
          fromJS({
            vote:({
              pair:[
                'Jamal',
                'Jaquan',
              ],
              tally:({
                'Jamal':1
              })
            }),
          })
        );
      })
      it('adds to existing tally for the voted entry', () => {
        const initialState = fromJS({

        })
      })
      /*     it('adds the entries to the state', () => {
      const initialState = fromJS({});
      const niggers = fromJS(['Jamal', 'Jaquan']);
      const nextState = setNiggers(initialState, niggers);
      const expectedState = fromJS({ niggers: [ 'Jamal', 'Jaquan']});

      expect( nextState ).to.equal( expectedState );
    });

    it('takes the next...',() => {
    const initialState = fromJS({
    niggers:['Jamal','Jaquan','Sunshine']
  });
  const nextState = next(initialState);
  expect(nextState).to.equal(fromJS({
  vote: {pair: [ 'Jamal','Jaquan' ]},
  niggers: [ 'Sunshine' ]
}));
});*/
});
});
