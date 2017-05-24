import { fromJS } from 'immutable';

// ...
function getWinners(vote) {
  if(!vote) return [];
  const [a, b] = vote.get('pair');
  const aVotes = vote.getIn(['tally', a], 0);
  const bVotes = vote.getIn(['tally', b], 0);
  if      (aVotes > bVotes) return [a];
  else if (bVotes > aVotes) return [b];
  else                      return [a, b];
};

export const next = (state, initialState) => {
  const entries = state.get('entries').concat(getWinners(state.get(vote)));
  return state.merge({
    vote:fromJS({pair: entries.take(2)}),
    entries: entries.skip(2)
  });
  const movies = initialState.get('movies');
  return initialState.merge({
    vote: fromJS({pair: movies.take(2)}),
    movies: movies.skip(2)
  });
};

export const addMovies = ( currentState, nuMovies) => {
  return currentState.update( 'movies', movies => movies.push(nuMovies));
};

export const setMovies = (state, movies) => {
  return state.set( 'movies', movies);
};

export const vote = (initialState, entry) => {
  return initialState.updateIn(
    ['vote', 'tally', entry],
    0,
    tally => tally + 1
  );
};
