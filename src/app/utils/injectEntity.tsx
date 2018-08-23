import React, { Component, ComponentType, ComponentClass } from 'react'
import { object } from 'prop-types'
import hoistNonReactStatics from 'hoist-non-react-statics'
import { Schema } from 'normalizr'

import getInjectors from './sagaInjectors'
import makeFetchEntitySaga from './entitySaga'

type InjectEntity = (params: { key: string, path: string, schema?: Schema }) =>
  <P>(Component: ComponentClass<P> & any) =>
    ComponentType<any>

const injectEntityHOC: InjectEntity = ({ key, path, schema }) => WrappedComponent => {
  class EntityInjector extends Component {
    static WrappedComponent = WrappedComponent
    static contextTypes = { store: object }

    injectors = getInjectors(this.context.store)

    componentWillMount() {
      const { injectSaga } = this.injectors
      const saga = makeFetchEntitySaga({ key, path, schema })
      injectSaga(key, { saga }, this.props)
    }

    render() {
      return <WrappedComponent {...this.props} />
    }
  }

  return hoistNonReactStatics(EntityInjector, WrappedComponent)
}

export default injectEntityHOC