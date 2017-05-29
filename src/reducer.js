import {setMovies, next, vote, INITIAL_STATE} from './core';

export default function reducer(state = INITIAL_STATE, action){
  switch (action.type) {
    case 'SET_MOVIES':
    return setMovies(state, action.movies);
    case 'NEXT':
    return next(state);
    case 'VOTE':
    return vote(state, action.entry)
  }
  return state;
}
