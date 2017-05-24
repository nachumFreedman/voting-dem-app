import { expect } from 'chai';
import { fromJS } from 'immutable';
import {
  addMovies,
  setMovies,
  next,
  vote,
} from '../src/core'

describe('application logic', () => {

  describe('next', ()=> {

    // ...

    it('puts winner of current vote back to entries', () => {
      const state = fromJS({
        vote:{
          pair: ['Trainspotting', '28 Days Later'],
          tally: {
            'Trainspotting': 4,
            '28 Days Later': 2,
          }
        },
        entries: ['Sunshine', 'Millions','127 Hours'],
      });
      const nextState = next(state);
      expect(nextState).to.equal(
        fromJS({
          vote: {
            pair: ['Sunshine','Millions']
          },
          entries: ['127 Hours', 'Trainspotting'],
        }));
      });

      it('puts both from tied vote back to entries', () => {
        const state = fromJS({
          vote:{
            pair: ['Trainspotting', '28 Days Later'],
            tally:{
              'Trainspotting': 3,
              '28 Days Later': 3,
            }
          },
          entries:['Sunshine', 'Millions', '127 Hours']
        });
        const nextState = next(state);
        expect(nextState).to.equal(
          fromJS({
            vote:{
              pair:['127 Hours', 'Trainspotting', '28 Days Later']
            }
          }));
        });
      });
      describe( 'vote', () => {

        it('creates a tally for the voted entry', () => {
          const initialState = fromJS({
            vote:{
              pair:[
                'Trainspotting',
                '28 Days Later',
              ],
            },
            entries:[],
          });
          const nextState = vote(initialState, 'Trainspotting',);
          expect(nextState).to.equal(
            fromJS({
              vote:{
                pair:[
                  'Trainspotting',
                  '28 Days Later',
                ],
                tally:{
                  'Trainspotting':1
                },
              },
              entries:[],
            })
          );
        });

        it('adds to existing tally for the voted entry', () => {
          const initialState = fromJS({
            vote:{
              pair:[
                'Trainspotting',
                '28 Days Later',
              ],
              tally:{
                'Trainspotting':3,
                '28 Days Later':2,
              }
            },
            entries:[],
          });
          const nextState = vote(initialState,'Trainspotting');
          expect(nextState).to.equal(fromJS({
            vote:{
              pair:[
                'Trainspotting',
                '28 Days Later',
              ],
              tally:{
                'Trainspotting':4,
                '28 Days Later':2,
              }
            },
            entries:[],
          }));
        });
        it('adds the entries to the state', () => {
          const initialState = fromJS({});
          const movies = fromJS(['Trainspotting', '28 Days Later']);
          const nextState = setMovies(initialState, movies);
          const expectedState = fromJS({ movies: [ 'Trainspotting', '28 Days Later']});

          expect( nextState ).to.equal( expectedState );
        });

        it('takes the next...',() => {
          const initialState = fromJS({
            movies:['Trainspotting','28 Days Later','Sunshine']
          });
          const nextState = next(initialState);
          expect(nextState).to.equal(fromJS({
            vote: {pair: [ 'Trainspotting','28 Days Later' ]},
            movies: [ 'Sunshine' ]
          }));
        });
      });
    });
