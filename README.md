# upstndr
### A non-boilerplate self-contained and ready out of the box framework written on TypeScript for develop universal web apps with the best parts of react ecosystem.
---

#### [Documentation](/docs)

Upstndr makes easy to start develop well-scalable web applications with react and give you the best tools of rich react ecosystem out of the box. You don't need to configure anything in most cases and don't need to support the basic level of the application infrastructure yourself, upstndr has already did it and will update itself.

It make well-optimized client bundles with webpack and serve those in development and optimized production modes. It give you an universal server-side rendering and allows you to get an API server in the same app.

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

## Install
```
yarn add upstndr
```
You can use all modules which upstndr use internally and don't need to install any peer dependencies.

## How to run

Start app in development mode
``` bash
$ yarn upstndr
```
or in production
``` bash
$ yarn upstndr production
```

## TypeScript

Upstndr written on TypeScript and motivate you to write code on ts, but you can use a plain JavaScript normally.

## License

Upstndr is MIT licensed.