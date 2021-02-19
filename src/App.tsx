import React, { useState } from 'react'
import Form from './components/Form'
import config from './config.json'
import { Config } from './model'

function pruneValues(values?: object) {
  const pruned: { [key: string]: any } = {}

  if (values !== undefined)
    for (const [key, value] of Object.entries(values))
      if (value !== '') pruned[key] = value

  return pruned
}

function App() {
  const [values, setValues] = useState()

  return (
    <div
      style={{
        fontFamily: 'sans-serif',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div style={{ margin: '0 1rem' }}>
        <h1>Config in JSON</h1>
        <pre>{JSON.stringify(config, null, 2)}</pre>
      </div>

      <div style={{ margin: '0 1rem' }}>
        <h1>Generated form</h1>
        <Form config={config as Config} onChange={setValues} />
      </div>

      <div style={{ margin: '0 1rem' }}>
        <h1>Current values</h1>
        <pre>{JSON.stringify(pruneValues(values), null, 2)}</pre>
      </div>
    </div>
  )
}

export default App
