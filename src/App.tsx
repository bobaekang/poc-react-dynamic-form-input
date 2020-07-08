import React from 'react'
import Form from './components/Form'
import config from './config.json'

const initialValues = {
  checkbox: false,
  number: 0,
  text: '',
  select: '',
}

function App() {
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
        <Form config={config} initialValues={initialValues} />
      </div>
    </div>
  )
}

export default App
