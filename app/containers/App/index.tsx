import React, { PureComponent } from 'react'
import { Switch, Route } from 'react-router-dom'
import HomePage from 'containers/Home'

export default class App extends PureComponent {
  render() {
    return (
      <div>
        <div>WAT</div>
        <Switch>
          <Route exact path="/" component={HomePage} />
        </Switch>
      </div>
    )
  }
}
