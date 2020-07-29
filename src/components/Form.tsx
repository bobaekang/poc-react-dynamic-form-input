import React, { useEffect, Fragment } from 'react'
import { useFormik } from 'formik'
import InputFactory from './InputFactory'

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

  const inputTypeMap: {
    [key: string]: string
  } = inputs.reduce((acc, { name, type }) => ({ ...acc, [name]: type }), {})

  return (
    <form>
      {groups.map((g) => (
        <Fragment key={g}>
          {g && <h2 style={{ textTransform: 'capitalize' }}>{g}</h2>}

          {inputs.map((input) => {
            if (input.group !== g) return undefined

            const { name, defaultValue, showIf, group, ...keyConfig } = input
            const hideInput =
              showIf &&
              inputTypeMap[showIf] === 'checkbox' &&
              !formik.values[showIf]

            return hideInput ? undefined : (
              <div style={{ margin: '1rem' }} key={name}>
                <InputFactory
                  name={name}
                  config={keyConfig}
                  value={formik.values[name]}
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
