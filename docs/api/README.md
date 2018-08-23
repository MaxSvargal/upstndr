# API Reference

* [`Higher Order Components`](#higher-order-components)
  * [`injectReducer({ key, reducer })`](#injectreducer)
  * [`injectSaga({ key, saga })`](#injectsaga)
  * [`injectEntity({ key, path, schema? })`](#injectentity)
* [`Helpers`](#helpers)
  * [`combineReducers(reducers)`](#combinereducers)
  * [`compose(...functions)`](#compose)
  * [`connect(mapStateToProps, mapDispatchToProps)`](#connect)
  * [`createAction(description)`](#connect)
  * [`createReducer(handlers, defaultState)`](#connect)
  * [`createSelector(...inputSelectors | [inputSelectors], resultFunc)`](#connect)
  * [`createStructuredSelector(selectors, selectorCreator)`](#connect)
  * [`css(styles)`](#connect)
  * [`fetch`](#connect)
  * [`schema`](#connect)
  * [`styled(tag)(styles)`](#connect)
  * [`withRouter`](#connect)


## Higher Order Components

### `injectReducer({ key, reducer })`

Inject [reducer](https://github.com/reduxjs/redux) to the application store.

### `injectSaga({ key, saga })`

Inject [saga](https://github.com/redux-saga/redux-saga) and run it on container will load.

### `injectEntity({ key, path, schema? })`

Fetch entities by HTTP(S) path, then handle it by [normalizr]('https://github.com/paularmstrong/normalizr'). You can pass a custom normalizr schema or use the default schema for collection with key `id`

E.g. `const defaultSchema = [ new schema.Entity(key, {}, { idAttribute: 'id' }) ]`


## Helpers

### [combineReducers(reducers)](https://github.com/reduxjs/redux/blob/master/docs/api/combineReducers.md)
Combine multiple reducers into one

### [compose(...functions)](https://github.com/reduxjs/redux/blob/master/docs/api/compose.md)
Compose HOC's and connect them to component

### [connect(mapStateToProps, mapDispatchToProps)](https://github.com/reduxjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options)
Connect state as props and bind actions to a component

### [createAction(description)](https://github.com/pauldijou/redux-act#createactiondescription-payloadreducer-metareducer)
Makes a new action creator. You should pass it to reducer's handlers as keys.

### [createReducer(handlers, defaultState)](https://github.com/pauldijou/redux-act#createreducerhandlers-defaultstate)
Makes a new redux reducer

### [createSelector(...inputSelectors | [inputSelectors], resultFunc)](https://github.com/reduxjs/reselect#createselectorinputselectors--inputselectors-resultfunc)
Takes one or more selectors, or an array of selectors, computes their values and passes them as arguments to resultFunc.

### [createStructuredSelector(selectors, selectorCreator)](https://github.com/reduxjs/reselect#createstructuredselectorinputselectors-selectorcreator--createselector)
It is a convenience function for a common Reselect pattern. Combine selectors to a single object

### [css](https://github.com/emotion-js/emotion/blob/master/docs/css.md)

Style things with css literal string and pass it as className

### [fetch](https://github.com/matthew-andrews/isomorphic-fetch)
Universal version of window.fetch

### [schema](https://github.com/paularmstrong/normalizr/blob/master/docs/api.md#schema)
Creates a schema to normalize an array of entities.

### [styled(tag)(styles)](https://github.com/emotion-js/emotion/blob/master/docs/styled.md)
Create React components that have styles attached to them. 

### [withRouter](https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/api/withRouter.md)
HOC will pass updated `match`, `location`, and `history` props to the wrapped component.