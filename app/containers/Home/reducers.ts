function todosReducer(state: string[] = [], action: any) {
  switch (action.type) {
    case 'ADD_TODO':
      return [ ...state, action.payload ]
    default:
      return state
  }
}

export default todosReducer