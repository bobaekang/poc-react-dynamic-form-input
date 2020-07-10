import React from 'react'
import { useFormik } from 'formik'
import InputFactory from './InputFactory'

type InputConfig = {
  type: string
  label: string
  options?: string[]
  defaultValue?: any
  [key: string]: any
}

export type FormProps = {
  config: {
    [key: string]: InputConfig
  }
}

const getInitialValues = (config: {
  [key: string]: InputConfig
}): { [key: string]: any } =>
  Object.keys(config).reduce(
    (acc, key) => ({
      ...acc,
      [key]: config[key].type !== 'checkbox' && config[key].defaultValue,
    }),
    {}
  )

const Form = ({ config }: FormProps) => {
  const formik = useFormik({
    initialValues: { ...getInitialValues(config) },
    onSubmit() {},
  })
  return (
    <form>
      {Object.keys(config).map((key) => {
        const { defaultValue, showIf, ...keyConfig } = config[key]
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
