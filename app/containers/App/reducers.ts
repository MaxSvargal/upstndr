import { LOCATION_CHANGE } from 'react-router-redux'

export function routeReducer(state: object = { location: null }, action: any) {
  switch (action.type) {
    /* istanbul ignore next */
    case LOCATION_CHANGE:
      return { ...state, location: action.payload }
    default:
      return state
  }
}