# upstndr
### A non-boilerplate self-contained and ready out of the box framework for develop universal web apps with the best parts of react ecosystem and written on TypeScript.
---
It build client bundles with webpack and serve those in development and optimized production mode. It give you an universal server-side rendering and allow you to get an API server in the same app.

upstndr use [ducks](https://medium.freecodecamp.org/scaling-your-redux-app-with-ducks-6115955638be) approaches of structuring. It is a feature-first and looks like:
```
container/
├── actions.ts
├── index.ts
├── sagas.ts
├── reducers.ts
├── selectors.ts
├── tests.ts
├── types.ts
├── utils.ts
```

You can import all modules from the upstndr package that it use internally (e.g. `upstndr/internals/${package}`). Of course you can use it as usual, but some features may work incorrectly.

There are the all internal dependencies:
- react-redux
- react-router-dom
- react-router-redux
- react
- redux-saga-effects
- redux-saga
- redux
- reselect

## Install
```
yarn add upstndr
```

## Usage

1. Make `app/containers/App` directory. Add `index.ts` inside, it will be a root container which contains a global application functional

```jsx
import React, { PureComponent } from 'react'
import { Switch, Route } from 'react-router-dom'

import HomePage from 'containers/Home'

export default class App extends PureComponent {
  render() {
    return (
      <div>
        <h2>WAT</h2>
        <Switch>
          <Route exact path="/" component={HomePage} />
        </Switch>
      </div>
    )
  }
}

```

2. Let's make a home container in `app/containers/Home` directory. Add `index.ts` which will be loaded when we request a root page `/`. And now we can inject reducers and sagas to our container, specified for this page.

``` jsx
import React, { PureComponent, Fragment } from 'upstndr/internals/react'
import { compose, connect, injectSaga, injectReducer } from 'upstndr'

import saga from './sagas'
import reducer from './reducers'
import { addTodo } from './actions'

interface Props {
  todos: string[]
  addTodo: (text: string) => void
}

class HomePage extends PureComponent<Props> {
  addTodo = () =>
    this.props.addTodo('I am a new note!')

  render() {
    return (
      <Fragment>
        { this.props.todos.map(v =>
          <div key={ v }>{ v }</div>
        ) }
        <button onClick={ this.addTodo }>Add new todo</button>
      </Fragment>
    )
  }
}

const withSaga = injectSaga({ key: 'home', saga })
const withReducer = injectReducer({ key: 'todos', reducer })
const withConnect = connect(({ todos }) => ({ todos }), { addTodo })

export default compose(withSaga, withReducer, withConnect)(HomePage)
```

### 3. Create redux ecosystem

`/app/containers/Home/actions.ts`
``` typescript
import { createAction } from 'upstndr'

export const addTodo = createAction('add todo list item', (text: string) => text)
```

`/app/containers/Home/reducers.ts`
``` typescript
import { createReducer } from 'upstndr'
import { addTodo } from './actions'

export const todoReducer = createReducer({
  [addTodo]: (state: string[], payload: string) =>
    [ ...state, payload ]
}, [])
```

`/app/containers/Home/sagas.ts`
``` typescript
import { put, fork } from 'upstndr/internals/redux-saga-effects'
import { delay } from 'upstndr/internals/redux-saga'

import { addTodo } from './actions'

function* asyncAddTodoSaga() {
  while (true) {
    const { payload: { text } } = yield take(addTodo)
    yield delay(200)
    yield put(addTodo(`Addition ${text} by saga`))
  }
}

export default function* homeSaga() {
  yield fork(asyncAddTodoSaga)
}
```

## How to run

Start app in development mode
``` bash
$ yarn upstndr
```
or in production
``` bash
$ yarn upstndr production
```