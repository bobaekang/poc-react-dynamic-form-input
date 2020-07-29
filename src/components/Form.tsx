import React, { useEffect, Fragment } from 'react'
import { useFormik } from 'formik'
import InputFactory from './InputFactory'

type InputConfig = {
  type: string
  label: string
  group: string
  options?: string[]
  defaultValue?: any
  [key: string]: any
}

export type FormProps = {
  config: {
    inputs: {
      [key: string]: InputConfig
    }
    groups: string[]
  }
  onChange(values: any): void
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

const Form = ({ config: { inputs, groups }, onChange }: FormProps) => {
  const formik = useFormik({
    initialValues: { ...getInitialValues(inputs) },
    onSubmit() {},
  })

  useEffect(() => {
    onChange({ ...formik.values })
  }, [formik.values, onChange])

  return (
    <form>
      {groups.map((g) => (
        <Fragment key={g}>
          <h2 style={{ textTransform: 'capitalize' }}>{g}</h2>

          {Object.keys(inputs).map((key) => {
            if (inputs[key].group !== g) return undefined

            const { defaultValue, showIf, group, ...keyConfig } = inputs[key]
            const hideInput =
              showIf &&
              inputs[showIf].type === 'checkbox' &&
              !formik.values[showIf]

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
        </Fragment>
      ))}
    </form>
  )
}

export default Form
