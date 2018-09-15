import { createReducer } from 'redux-act'
import { Reducer, AnyAction } from 'redux'
import { entityFetchSuccess } from '../actions'

const defaultState = {} as {
  [key: string]: {
    entities: {
      [id: string]: object
    },
    ids: any[]
  }
}

export type State = typeof defaultState

const reducer = createReducer<State>({}, defaultState)

reducer.on(
  entityFetchSuccess,
  (state, { key, response: { entities, result } }) => ({
    ...state,
    [key]: {
      entities: {
        ...(state[key] && state[key].entities),
        ...entities[key]
      },
      ids: [
        ...new Set([
          ...(state[key] ? state[key].ids : []),
          ...result
        ])
      ]
    }
  })
)

export default reducer as Reducer<State, AnyAction>
