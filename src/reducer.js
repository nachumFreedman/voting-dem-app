import {setMovies, next, vote, INITIAL_STATE} from './core';

export default function reducer(state = INITIAL_STATE, action){
  switch (action.type) {
    case 'SET_MOVIES':
    return setMovies(state, action.movies);
    case 'NEXT':
    return next(state);
    case 'VOTE':
    return state.update('vote', voteState => vote(voteState, action.entry));
  }
  return state;
};

/*export function reducer1 (state, action){
  switch( action.type ) {
    case 'SET_MOVIES':
    return state.set( action.movies, 'set movies' );

    case 'NEXT':
    return state.set( action.movies, 'next' );

    case 'VOTE':
    return state.set( action.movies, 'is a vote ')
  }
};
*/
