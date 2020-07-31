import React, { useEffect, Fragment } from 'react'
import { useFormik } from 'formik'
import Field from './Field'

type InputConfig = {
  name: string
  type: string
  label: string
  group: string
  options?: string[]
  defaultValue?: any
  [key: string]: any
}

export type FormProps = {
  config: {
    inputs: InputConfig[]
    groups: string[]
  }
  onChange(values: any): void
}

const getInitialValues = (inputs: InputConfig[]): { [key: string]: any } =>
  inputs.reduce(
    (acc, { name, type, defaultValue }) => ({
      ...acc,
      [name]: type !== 'checkbox' && defaultValue,
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
          {g && <h2 style={{ textTransform: 'capitalize' }}>{g}</h2>}

          {inputs.map((input) => {
            if (input.group !== g) return undefined

            const { defaultValue, showIf, group, ...fieldConfig } = input
            const hideField =
              showIf && showIf.value !== formik.values[showIf.name]

            return hideField ? undefined : (
              <div style={{ margin: '1rem' }} key={fieldConfig.name}>
                <Field
                  config={fieldConfig}
                  value={formik.values[fieldConfig.name]}
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
