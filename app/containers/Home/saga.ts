import { put, fork } from 'redux-saga/effects'

import { addToDo } from './actions'

function* testSaga() {
  yield put(addToDo('testSaga yeap!'))
  console.log('testSaga yeap!')
}

export default function* homeSaga() {
  yield fork(testSaga)
}