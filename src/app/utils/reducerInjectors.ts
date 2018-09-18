import { combineReducers, Reducer } from 'redux'

import { Store } from '../configureStore'
import router from '../reducers/router'
import entities from '../reducers/entities'

// Mock reducers instantly before they will be replaced by real reducers
// Because we don't know about server state on client side on startup
const makeReducersFromState = (state: { [key: string]: Function }) =>
  Object.keys(state).reduce((a, b) => ({ ...a, [b]: () => state[b] }), {})

export function createReducer(store: Store) {
  const state = store.getState()
  const stateReducers = makeReducersFromState(state)
  const { injectedReducers } = store

  return combineReducers({
    ...stateReducers,
    ...injectedReducers,
    router,
    entities,
  })
}

export function getReducer(state: { [key: string]: any }) {
  const stateReducers = makeReducersFromState(state)

  return combineReducers({
    ...stateReducers,
    router,
    entities,
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
    store.replaceReducer(createReducer(store))
  }
}

export default function getInjectors(store: Store) {
  return {
    injectReducer: injectReducerFactory(store),
  }
}
