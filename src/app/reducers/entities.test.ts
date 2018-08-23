import reducer from './entities'
import { entityFetchSuccess } from '../actions'

describe('Entities reducer', () => {
  test('should add entities correctly', () => {
    const state = {
      a: {
        entities: {},
        ids: []
      }
    }
    const action = entityFetchSuccess({
      key: 'b',
      path: '/b',
      response: {
        entities: {
          b: {
            1: { id: 1 },
            2: { id: 2 }
          }
        },
        result: [ 1, 2 ]
      }
    })
    const expected = {
      a: {
        entities: {},
        ids: []
      },
      b: {
        entities: {
          1: { id: 1 },
          2: { id: 2 }
        },
        ids: [ 1, 2 ]
      }
    }

    expect(reducer(state, action)).toEqual(expected)
  }),

  test('should update entities correctly', () => {
    const state = {
      a: {
        entities: {
          1: { id: 1},
          2: { id: 2 }
        },
        ids: [ 1, 2 ]
      }
    }
    const action = entityFetchSuccess({
      key: 'a',
      path: '/a',
      response: {
        entities: {
          a: {
            2: { id: 22 },
            3: { id: 33 }
          }
        },
        result: [ 2, 3 ]
      }
    })
    const expected = {
      a: {
        entities: {
          1: { id: 1 },
          2: { id: 22 },
          3: { id: 33 }
        },
        ids: [ 1, 2, 3 ]
      }
    }
    expect(reducer(state, action)).toEqual(expected)
  })
})