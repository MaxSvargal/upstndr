import { combineReducers, Reducer } from 'redux'

import { Store } from '../configureStore'
import router from '../reducers/router'
import entities from '../reducers/entities'

export function createReducer(injectedReducers?: { [key: string]: Reducer }) {
  return combineReducers({
    router,
    entities,
    ...injectedReducers,
  })
}

export function getReducer(state: object) {
  // Mock reducers instantly before they will be replaced by real reducers
  // Because we don't know about server state on client side on startup
  const stateReducers = Object.keys(state).reduce((a, b) => ({ ...a, [b]: (c: any) => c || null }), {})

  return combineReducers({
    router,
    entities,
    ...stateReducers
  })
}

export function injectReducerFactory(store: Store) {
  return function injectReducer(key: string, reducer: Reducer) {
    // Check `store.injectedReducers[key] === reducer` for hot reloading when a key is the same but a reducer is different
    if (
      Reflect.has(store.injectedReducers, key) &&
      store.injectedReducers[key] === reducer
    ) return false

    store.injectedReducers[key] = reducer
    store.replaceReducer(createReducer(store.injectedReducers))
  }
}

export default function getInjectors(store: Store) {
  return {
    injectReducer: injectReducerFactory(store),
  }
}
