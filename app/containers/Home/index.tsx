import React, { PureComponent } from 'react'
import { compose } from 'redux'
import saga from './saga'
import injectSaga from 'utils/injectSaga'
import { connect } from 'react-redux'

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
type State = { todos: string[] }
const withConnect = connect((({ todos }: State) => ({ todos })))

export default compose(withSaga, withConnect)(HomePage)

