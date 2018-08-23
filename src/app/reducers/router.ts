import { createReducer } from 'redux-act'
import { LOCATION_CHANGE } from 'connected-react-router'

const defaultState = {
  location: null as object | null
} as any

export type State = typeof defaultState

const reducer = createReducer<State>({}, defaultState)

reducer.on(
  LOCATION_CHANGE,
  (state, payload: any) => ({ ...state, location: payload })
)

export default reducer
