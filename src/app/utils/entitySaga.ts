import { call, put } from 'redux-saga/effects'
import { normalize, schema as normalizrSchema, Schema } from 'normalizr'
import { camelizeKeys } from 'humps'
import fetch from 'isomorphic-fetch'

import { entityFetchSuccess, entityFetchFailure } from '../actions'

type MakeFetchEntitySaga = (a: { key: string, path: string, schema?: Schema }) => () => Iterator<any>
const makeFetchEntitySaga: MakeFetchEntitySaga = ({ key, path, schema }) => function* () {
  try {
    // TODO: put request action?
    const res = yield call(fetch, path)
    if (!res.ok) throw Error(res.statusText)

    const json = yield call([ res, 'json' ])
    const camelizedJson = camelizeKeys(json)

    const defaultSchema = [ new normalizrSchema.Entity(key) ]
    const response = normalize(camelizedJson, schema || defaultSchema)
    console.log({ response })

    yield put(entityFetchSuccess({ key, path, response }))
  } catch (error) {
    console.log({ error })
    yield put(entityFetchFailure({ key, path, error: error.message }))
  }
}

export default makeFetchEntitySaga
