import { expect } from 'chai';
import { fromJS } from 'immutable';

describe('immutablity', () => {

  //...

  describe( 'A List', () => {
    const addMovies = ( currentState, nuMovies ) =>
    currentState.update( 'movies', movies => movies.push(nuMovies));

    it('is immutable', () => {
      const initialState = fromJS({ movies: [ 'Jamal', 'Jaquan' ] });
      const nextState = addMovies( initialState, 'Sunshine' );
      const expectedState = fromJS({ movies: ['Jamal','Jaquan','Sunshine' ]});

      expect( nextState ).to.equal( expectedState );
    });
  });
});
