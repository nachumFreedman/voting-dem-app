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

    it('marks winner when just ine entry left', () => {
      const state = fromJS({
        vote: {
          pair: fromJS[ 'Trainspotting', '28 Days Later' ],
          tally: {
            'Trainspotting': 4,
            '28 Days Later': 2,
          }
        },
        movies:[]
      })
      const nextState = next(state);
      expect(nextState).to.equal(fromJS({
        winner: 'Trainspotting'
      }));
    });

    it('puts winner of current vote back to movies', () => {
      const state = fromJS({
        vote: {
          pair: ['Trainspotting', '28 Days Later'],
          tally: {
            'Trainspotting': 4,
            '28 Days Later': 2,
          }
        },
        movies: ['Sunshine', 'Millions','127 Hours'],
      });

      const nextState = next(state);
      expect(nextState).to.equal(
        fromJS({
          vote: {
            pair: ['Sunshine','Millions']
          },
          movies: ['127 Hours', 'Trainspotting'],
        }));
      });

      it('puts both from tied vote back to movies', () => {
        const state = fromJS({
          vote:{
            pair: ['Trainspotting', '28 Days Later'],
            tally:{
              'Trainspotting': 3,
              '28 Days Later': 3,
            }
          },
          movies:['Sunshine', 'Millions', '127 Hours']
        });

        const nextState = next(state);
        expect(nextState).to.equal(
          fromJS({
            vote:{
              pair:['Sunshine', 'Millions']
            },
            movies: ['127 Hours', 'Trainspotting', '28 Days Later']
          }));
        });
      }); //describe('next')

      describe( 'vote', () => {

        it('creates a tally for the voted entry', () => {
          const initialState = fromJS({
            vote:{
              pair:[
                'Trainspotting',
                '28 Days Later',
              ],
            },
            movies:[],
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
              movies:[],
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
            movies:[],
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
            movies:[],
          }));
        });

        it('adds the movies to the state', () => {
          const initialState = fromJS({});
          const movies = fromJS(['Trainspotting', '28 Days Later']);
          const nextState = setMovies(initialState, movies);
          const expectedState = fromJS({ movies: [ 'Trainspotting', '28 Days Later']});

          expect( nextState ).to.equal( expectedState );
        });

        it('takes the next two movies under vote',() => {
          const initialState = fromJS({
            movies:['Trainspotting','28 Days Later','Sunshine']
          });
          const nextState = next(initialState);
          expect(nextState).to.equal(fromJS({
            vote:{
              pair:[ 'Trainspotting','28 Days Later' ]
            },
            movies: [ 'Sunshine' ]
          }));
        });
      }); //   describe( 'vote' )
    }); // describe( 'application logic' )
