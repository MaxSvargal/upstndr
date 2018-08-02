import React, { Component, ReactNode, ReactElement, ComponentType, ComponentClass } from 'react'
import hoistNonReactStatics from 'hoist-non-react-statics'
import { object } from 'prop-types'

import getInjectors from './sagaInjectors'

type IWrappedComponent = (
  props: { children?: ReactNode; },
  context?: any
) => ReactElement<any>

type InjectSaga = (
  params: {
    key: string,
    saga: () => Iterator<any>,
    mode?: 'RESTART_ON_REMOUNT'
  }
) => <P>(Component: ComponentClass<P> & any) => ComponentType<any>

const injectSaga: InjectSaga = ({ key, saga, mode }) => WrappedComponent => {
  class InjectSaga extends Component {
    static WrappedComponent: IWrappedComponent = WrappedComponent
    static contextTypes = { store: object }

    injectors = getInjectors(this.context.store)

    componentWillMount() {
      const { injectSaga } = this.injectors
      injectSaga(key, { saga, mode }, this.props)
    }

    componentWillUnmount() {
      const { ejectSaga } = this.injectors
      ejectSaga(key)
    }

    render() {
      return <WrappedComponent {...this.props} />
    }

    // static displayName = `withSaga(${WrappedComponent.displayName ||
    //   WrappedComponent.name ||
    //   'Component'})`
  }

  return hoistNonReactStatics(InjectSaga, WrappedComponent)
}

export default injectSaga
