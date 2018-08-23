import { createAction } from 'redux-act'

export const createEntity = createAction<{ key: string, value: any }>('create entity')
export const updateEntity = createAction<{ key: string, id: string, value: any }>('update entity')
export const deleteEntity = createAction<{ key: string, id: string }>('delete entity')

export const entityFetchSuccess = createAction<{ key: string, path: string, response: { entities: { [key: string]: object }, result: any[] } }>('entity fetch success')
export const entityFetchFailure = createAction<{ key: string, path: string, error: Error | string }>('entity fetch failure')
