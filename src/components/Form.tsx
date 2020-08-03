import React, { useEffect, Fragment } from 'react'
import { useFormik } from 'formik'
import Field from './Field'

type GroupConfig = {
  id: number
  name: string
}

type InputConfig = {
  groupId: number
  name: string
  type: string
  label: string
  options?: string[]
  defaultValue?: any
  [key: string]: any
}

export type FormProps = {
  config: {
    groups: GroupConfig[]
    inputs: InputConfig[]
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
      {groups.map((group) => (
        <Fragment key={group.id}>
          {group.name && (
            <h2 style={{ textTransform: 'capitalize' }}>{group.name}</h2>
          )}

          {inputs.map((input) => {
            if (input.groupId !== group.id) return undefined

            const { defaultValue, showIf, groupId, ...fieldConfig } = input
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
