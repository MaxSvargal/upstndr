import { createStore, applyMiddleware, compose, Reducer, Store as OriginalStore } from 'redux'
import createSagaMiddleware, { Task } from 'redux-saga'
import { getReducer } from '../utils/reducerInjectors'
// import { fromJS } from 'immutable'

const sagaMiddleware = createSagaMiddleware()

export interface Store extends OriginalStore {
  runSaga: typeof sagaMiddleware.run
  injectedReducers: {
    [key: string]: Reducer
  }
  injectedSagas: {
    [key: string]: {
      saga: () => Iterator<any>,
      task: Task,
      mode: string
    }
  }
}

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: typeof compose
  }
}

export default (initialState: object) => {
  const middlewares = [ sagaMiddleware, /* routerMiddleware(history) */ ]
  const enhancers = [ applyMiddleware(...middlewares) ]
  const composeEnhancers =  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose

  const store: Store = createStore(
    getReducer(initialState),
    initialState,
    composeEnhancers(...enhancers),
  )

  store.runSaga = sagaMiddleware.run
  store.injectedReducers = {}
  store.injectedSagas = {}

  return store
}