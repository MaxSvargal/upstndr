import React, { PureComponent } from 'otagai/internals/react'
import { compose, connect, injectSaga, injectReducer } from 'otagai'

import saga from './saga'
import reducer from './reducers'

interface Props {
  todos: string[]
}

class HomePage extends PureComponent<Props> {
  render() {
    return (
      <h1 style={{ color: 'red' }}>
        { this.props.todos.map(v => <span key={v}>{v}</span>) }
      </h1>
    )
  }
}

const withSaga = injectSaga({ key: 'home', saga })
const withReducer = injectReducer({ key: 'todos', reducer })

type State = { todos: string[] } // move this
const withConnect = connect((({ todos }: State) => ({ todos })))

export default compose(withSaga, withReducer, withConnect)(HomePage)