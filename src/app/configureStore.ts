import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { createBrowserHistory, createMemoryHistory } from 'history'
import { createStore, applyMiddleware, Reducer, Store as OriginalStore } from 'redux'
import createSagaMiddleware, { Task } from 'redux-saga'

import { getReducer, createReducer } from './utils/reducerInjectors'

const { BROWSER } = process.env

const sagaMiddleware = createSagaMiddleware({
  onError: (error: Error) => console.log(error),
  logger: (level, ...args) => console.log({ level, args })
})

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

export default (initialState: object, url = '/') => {
  const history = BROWSER
    ? createBrowserHistory()
    : createMemoryHistory({ initialEntries: [ url ] })

  const middlewares = [ routerMiddleware(history), sagaMiddleware ]
  const enhancers = applyMiddleware(...middlewares)

  const store: Store = createStore(
    connectRouter(history)(getReducer(initialState)),
    initialState,
    composeWithDevTools(enhancers),
  )

  store.runSaga = sagaMiddleware.run
  store.injectedReducers = {}
  store.injectedSagas = {}

  if (module.hot) {
    module.hot.accept('./', () => {
      store.replaceReducer(createReducer(store))
    })
  }

  return { store, history }
}