import { createAction } from 'redux-act'

export const addToDo = createAction('ADD_TODO', (str: string) => str)