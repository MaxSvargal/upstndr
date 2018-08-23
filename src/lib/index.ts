import { combineReducers } from 'redux'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { createAction, createReducer } from 'redux-act'
import { createSelector, createStructuredSelector } from 'reselect'
import styled, { css } from 'react-emotion'
import ApiRouter from 'koa-router'

import injectSaga from '../app/utils/injectSaga'
import injectReducer from '../app/utils/injectReducer'

export {
  ApiRouter,
  combineReducers,
  compose,
  connect,
  createAction,
  createReducer,
  createSelector,
  createStructuredSelector,
  css,
  injectReducer,
  injectSaga,
  styled,
  withRouter,
}
