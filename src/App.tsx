import React from 'react'
import Form from './components/Form'

const config = {
  checkbox: {
    type: 'checkbox',
    label: 'Simple checkbox',
  },
  number: {
    type: 'number',
    label: 'Simple number',
    props: {
      min: 0,
      max: 10,
    },
  },
  text: {
    type: 'text',
    label: 'Simple text',
    props: {
      pattern: '^[a-zA-Z]*$',
    },
  },
  select: {
    type: 'select',
    label: 'Simple select',
    options: ['foo', 'bar'],
    props: {
      placeholder: 'Select one',
    },
  },
}

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
