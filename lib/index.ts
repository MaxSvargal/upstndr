import { createAction, createReducer } from 'redux-act'
import { compose } from 'redux'
import { connect } from 'react-redux'

import injectSaga from '../app/utils/injectSaga'
import injectReducer from '../app/utils/injectReducer'

export {
  createAction,
  createReducer,
  injectSaga,
  injectReducer,
  compose,
  connect,
}
