import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
// import debug from 'debug'

const render = (App: any) =>
  ReactDOM.render((
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  ), document.getElementById('app'))

if (module.hot)
  module.hot.accept('./containers/App', () => {
    console.log('reloading')
    render(require('./containers/App').default)
  })
render(require('./containers/App').default)
