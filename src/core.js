import { fromJS } from 'immutable';
// import { } from '..test/core_spec.js'

// ...

export const INITIAL_STATE = fromJS({});

function getWinners(vote) {
  if(!vote) return [];
  const [a, b] = vote.get('pair');
  const aVotes = vote.getIn(['tally', a], 0);
  const bVotes = vote.getIn(['tally', b], 0);
  if      (aVotes > bVotes) return [a];
  else if (bVotes > aVotes) return [b];
  else                      return [a, b];
};

export function next(state) {
  const movies  = state.get('movies').concat(getWinners(state.get('vote')));
  if (movies.size === 1){
    return state.remove('vote')
    .remove('movies')
    .set('winner', movies.first())
  } else {
    return state.merge({
      vote: fromJS({pair: movies.take(2)}),
      movies: movies.skip(2)
    });
  }
};

export const addMovies = ( currentState, nuMovies) => {
  return currentState.update( 'movies', movies => movies.push(nuMovies));
};

export const setMovies = (state, movies) => {
  return state.set( 'movies', fromJS(movies));
};

export const vote = (initialState, entry) => {
  return initialState.updateIn(
    ['vote', 'tally', entry],
    0,
    tally => tally + 1
  );
};
