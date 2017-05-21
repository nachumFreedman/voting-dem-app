import { fromJS } from 'immutable';

// ...

export const next = (initialState) => {
  const niggers = initialState.get('niggers');
  return initialState.merge({
    vote: fromJS({pair: niggers.take(2)}),
    niggers: niggers.skip(2)
  })
};

export const addNigger = ( currentState, nuNigger) => {
  return currentState.update( 'niggers', niggers => niggers.push(nuNigger));
};
export const setNiggers = (state, niggers) => {
  return state.set( 'niggers', niggers);
};
