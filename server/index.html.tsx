import React from 'react'

interface Props {
  body: JSX.Element
  js: string[]
}

export default ({ body, js }: Props) => (
  <html>
    <body>
      <div id='app'>{body}</div>
      {js.map(v => (
        <script key={v} src={v} />
      ))}
    </body>
  </html>
)