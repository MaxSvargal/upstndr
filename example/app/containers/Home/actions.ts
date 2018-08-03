import { createAction } from 'redux-act'

export const addTodo = createAction('ADD_TODO', (str: string) => str)