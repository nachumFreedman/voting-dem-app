import { expect } from 'chai';
import { fromJS } from 'immutable';
import {
  addNigger,
  setNiggers,
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
        console.log(tally.Trainspotting);
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

      describe( 'vote', () => {

        it('creates a tally for the voted entry', () => {
          const initialState = fromJS({
            vote:{
              pair:[
                'Trainspotting',
                '28 days later',
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
          const niggers = fromJS(['Trainspotting', '28 Days Later']);
          const nextState = setNiggers(initialState, niggers);
          const expectedState = fromJS({ niggers: [ 'Trainspotting', '28 Days Later']});

          expect( nextState ).to.equal( expectedState );
        });

        it('takes the next...',() => {
          const initialState = fromJS({
            niggers:['Trainspotting','28 Days Later','Sunshine']
          });
          const nextState = next(initialState);
          expect(nextState).to.equal(fromJS({
            vote: {pair: [ 'Trainspotting','28 Days Later' ]},
            niggers: [ 'Sunshine' ]
          }));
        });
      });
    });
