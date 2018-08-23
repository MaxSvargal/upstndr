import { compose, combineReducers } from 'redux'
import { connect } from 'react-redux'
import { createAction, createReducer } from 'redux-act'
import { createSelector, createStructuredSelector } from 'reselect'
import { schema } from 'normalizr'
import { withRouter } from 'react-router'
import fetch from 'isomorphic-fetch'
import styled, { css } from 'react-emotion'
import ApiRouter from 'koa-router'

import injectEntity from '../app/utils/injectEntity'
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
  fetch,
  injectEntity,
  injectReducer,
  injectSaga,
  schema,
  styled,
  withRouter,
}
