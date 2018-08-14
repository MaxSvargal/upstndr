import React, { Component, ComponentType, ComponentClass } from 'react'
import { Reducer } from 'redux'
import { object } from 'prop-types'
import hoistNonReactStatics from 'hoist-non-react-statics'

import getInjectors from './reducerInjectors'

type InjectReducer = (params: { key: string, reducer: Reducer }) => <P>(Component: ComponentClass<P> & any) => ComponentType<any>

const injectReducerHOC: InjectReducer = ({ key, reducer }) => WrappedComponent => {
  class ReducerInjector extends Component {
    static WrappedComponent = WrappedComponent
    static contextTypes = { store: object }

    injectors = getInjectors(this.context.store)

    componentWillMount() {
      const { injectReducer } = this.injectors
      injectReducer(key, reducer)
    }

    render() {
      return <WrappedComponent {...this.props} />
    }
  }

  return hoistNonReactStatics(ReducerInjector, WrappedComponent)
}

export default injectReducerHOC