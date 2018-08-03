import { put, fork } from 'otagai/internals/redux-saga-effects'
import { delay } from 'otagai/internals/redux-saga'

import { addTodo } from './actions'

function* testSaga() {
  yield delay(200)
  yield put(addTodo('testSaga yeap!'))
  console.log('testSaga yeap!')
}

export default function* homeSaga() {
  yield fork(testSaga)
}
