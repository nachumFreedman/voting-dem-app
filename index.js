import makeStore from './src/store.js';
import {startServer} from './src/server.js';

export const store = makeStore();
startServer(store);

store.dispatch({
  type:'SET_MOVIES',
  movies: require('./movies.json')
});
store.dispatch({type: 'NEXT'});
