import { createReducer } from 'redux-act'
import { Reducer, AnyAction } from 'redux'
import { LOCATION_CHANGE } from 'connected-react-router'

const defaultState = {
  location: null as object | null
}

export type State = typeof defaultState

const reducer = createReducer<State>({}, defaultState)

reducer.on(
  LOCATION_CHANGE,
  (state, payload: any) => ({ ...state, location: payload })
)

export default reducer as Reducer<State, AnyAction>
