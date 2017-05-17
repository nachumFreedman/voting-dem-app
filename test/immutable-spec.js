import { expect } from 'chai';
import { fromJS } from 'immutable';

describe('immutablity', () => {

  //...

  describe( 'A List', () => {
    const addNigger = ( currentState, nuNigger ) =>
    currentState.update( 'niggers', niggers => niggers.push(nuNigger));

    it('is immutable', () => {
      const initialState = fromJS({ niggers: [ 'Jamal', 'Jaquan' ] });
      const nextState = addNigger( initialState, 'Sunshine' );
      const expectedState = fromJS({ niggers: ['Jamal','Jaquan','Sunshine' ]});

      expect( nextState ).to.equal( expectedState );
    });
  });
});
