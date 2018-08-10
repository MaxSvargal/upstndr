import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import { createStore, applyMiddleware, Reducer, Store as OriginalStore } from 'redux'
import { History } from 'history'
import { routerMiddleware } from 'react-router-redux'
import createSagaMiddleware, { Task } from 'redux-saga'

import { getReducer, createReducer } from './utils/reducerInjectors'

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

export default (initialState: object, history: History) => {
  const middlewares = [ sagaMiddleware, routerMiddleware(history) ]
  const enhancers = applyMiddleware(...middlewares)

  const store: Store = createStore(
    getReducer(initialState),
    initialState,
    composeWithDevTools(enhancers),
  )

  store.runSaga = sagaMiddleware.run
  store.injectedReducers = {}
  store.injectedSagas = {}

  if (module.hot) {
    module.hot.accept('containers/App/reducers', () => {
      store.replaceReducer(createReducer(store.injectedReducers));
    })
  }

  return store
}