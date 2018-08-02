import React from 'react'

interface Props {
  body: JSX.Element
  js: string[],
  state?: object
}

export default ({ body, js, state }: Props) => (
  <html>
    <body>
      <div id='app'>{body}</div>
      { state &&
        <script dangerouslySetInnerHTML={ {
          __html: `window.__PRELOADED_STATE__ = ${JSON.stringify(state).replace(/</g, '\\u003c')}`
        } } />
      }
      {js.map(v => (
        <script key={v} src={v} />
      ))}
    </body>
  </html>
)