import React from 'react'
import { useFormik } from 'formik'
import InputFactory from './InputFactory'

type InputConfig = {
  type: string
  label: string
  options?: string[]
  [key: string]: any
}

export type FormProps = {
  config: {
    [key: string]: InputConfig
  }
  initialValues: {
    [key: string]: any
  }
}

const Form = ({ config, initialValues }: FormProps) => {
  const formik = useFormik({
    initialValues: { ...initialValues },
    onSubmit() {},
  })

  return (
    <form>
      {Object.keys(config).map((key) => {
        const { showIf, ...keyConfig } = config[key]
        const hideInput =
          showIf && config[showIf].type === 'checkbox' && !formik.values[showIf]

        return hideInput ? undefined : (
          <div style={{ margin: '1rem' }} key={key}>
            <InputFactory
              name={key}
              config={keyConfig}
              value={formik.values[key]}
              onChange={formik.handleChange}
            />
          </div>
        )
      })}
    </form>
  )
}

export default Form
