import { expect } from 'chai';
import { fromJS } from 'immutable';
import {
  addNigger,
  setNiggers,
  next,
} from '../src/core'

describe('application logic', () => {

  // ..

  describe( 'vote', () => {

    it('adds the entries to the state', () => {
      const initialState = fromJS({});
      const niggers = fromJS(['Jamal', 'Jaquan']);
      // const nextState = addNigger( initialState, 'Sunshine'); reducer function
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
    });
  });
});
