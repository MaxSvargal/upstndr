import { put, fork } from 'redux-saga/effects'
import { delay } from 'redux-saga'

import { addToDo } from './actions'

function* testSaga() {
  yield delay(200)
  yield put(addToDo('testSaga yeap!'))
  console.log('testSaga yeap!')
}

export default function* homeSaga() {
  yield fork(testSaga)
}