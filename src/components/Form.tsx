import React, { useEffect, Fragment } from 'react'
import { useFormik } from 'formik'
import Field from './Field'

type GroupConfig = {
  id: number
  name: string
}

type FieldConfig = {
  id: number
  groupId: number
  name: string
  type: string
  label: string
  options?: string[]
  defaultValue?: any
  showIf?: { id: number; value: any }
  [key: string]: any
}

export type FormProps = {
  config: {
    groups: GroupConfig[]
    fields: FieldConfig[]
  }
  onChange(values: any): void
}

const getInitialValues = (inputs: FieldConfig[]): { [key: string]: any } =>
  inputs.reduce(
    (acc, { name, type, defaultValue }) => ({
      ...acc,
      [name]: type !== 'checkbox' && defaultValue,
    }),
    {}
  )

const getShowIfName = (fields: FieldConfig[], showIfId: number) => {
  let showIfName
  for (const { id, name } of fields) {
    if (showIfId === id) {
      showIfName = name
      break
    }
  }

  return showIfName
}

const Form = ({ config: { groups, fields }, onChange }: FormProps) => {
  const formik = useFormik({
    initialValues: { ...getInitialValues(fields) },
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

          {fields.map(
            ({ id, groupId, defaultValue, showIf, ...fieldConfig }) => {
              if (groupId !== group.id) return undefined

              const showIfName = showIf && getShowIfName(fields, showIf.id)
              const hideField =
                showIf &&
                showIfName &&
                showIf.value !== formik.values[showIfName]

              return hideField ? undefined : (
                <div style={{ margin: '1rem' }} key={id}>
                  <Field
                    config={fieldConfig}
                    value={formik.values[fieldConfig.name]}
                    onChange={formik.handleChange}
                  />
                </div>
              )
            }
          )}
        </Fragment>
      ))}
    </form>
  )
}

export default Form
