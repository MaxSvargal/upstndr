import { LOCATION_CHANGE } from 'connected-react-router'

export function routeReducer(state: object = { location: null }, action: any) {
  switch (action.type) {
    /* istanbul ignore next */
    case LOCATION_CHANGE:
      return { ...state, location: action.payload }
    default:
      return state
  }
}