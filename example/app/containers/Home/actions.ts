import { createAction } from 'otagai'

export const addTodo = createAction('ADD_TODO', (str: string) => str)