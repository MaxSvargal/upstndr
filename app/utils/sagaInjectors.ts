import { Store } from 'store'

const injectSagaFactory = (store: Store) => (
    key: string,
    descriptor: { saga: () => Iterator<any>, mode: string },
    args: object
  ) => {
    const { saga, mode } = descriptor
    // TODO: daemon mode here
    if (!(key in store.injectedSagas)) {
      store.injectedSagas[key] = {
        saga, mode, task: store.runSaga(saga, args),
      }
    }
  }

const ejectSagaFactory = (store: Store) =>
  (key: string) => {
    if (!(key in store.injectedSagas)) {
      const { mode, task } = store.injectedSagas[key]
      // TODO: Check on DEEMON mode
      task.cancel()
    }
  }


const getInjectors = (store: Store) => ({
  injectSaga: injectSagaFactory(store),
  ejectSaga: ejectSagaFactory(store),
})

export default getInjectors