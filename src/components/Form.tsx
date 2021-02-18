import React, { useEffect, Fragment } from 'react'
import { useFormik } from 'formik'
import Field from './Field'

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

const checkShowIf = (crit: showIfCriterion, value: any) => {
  switch (crit.operator) {
    case 'eq':
      return crit.value === value
    case 'gt':
      return crit.value < value
    case 'gte':
      return crit.value <= value
    case 'lt':
      return crit.value > value
    case 'lte':
      return crit.value >= value
    case 'ne':
      return crit.value !== value
  }
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

              let hideField = false
              if (showIf !== undefined)
                for (const field of fields)
                  if (showIf.id === field.id) {
                    hideField = !checkShowIf(showIf, formik.values[field.name])
                    break
                  }

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
