import { createReducer } from 'otagai'
import { addTodo } from './actions'

const todosReducer = createReducer({
  [addTodo.toString()]: (state: string[], payload: string) =>
    [ ...state, payload ]
}, [])

export default todosReducer
