import React, { useState } from 'react'
import Form from './components/Form'
import config from './config.json'

type GroupConfig = {
  id: number
  name: string
}

type showIfCriterion = {
  id: number
  operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'ne'
  value: any
}

type FieldConfig = {
  id: number
  groupId: number
  name: string
  type: string
  label: string
  options?: string[]
  defaultValue?: any
  showIf?: showIfCriterion
  [key: string]: any
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
        <Form
          config={
            config as {
              groups: GroupConfig[]
              fields: FieldConfig[]
            }
          }
          onChange={setValues}
        />
      </div>

      <div style={{ margin: '0 1rem' }}>
        <h1>Current values</h1>
        <pre>{JSON.stringify(values, null, 2)}</pre>
      </div>
    </div>
  )
}

export default App
