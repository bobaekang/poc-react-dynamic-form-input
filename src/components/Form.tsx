import React, { useEffect, Fragment } from 'react'
import { useFormik } from 'formik'
import Field from './Field'
import { Config, FieldConfig, showIfCondition, showIfCriterion } from '../model'

export type FormProps = {
  config: Config
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

const isShow = (crit: showIfCriterion, value: any) => {
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

const handleShowif = (
  { criteria, operator }: showIfCondition,
  fields: FieldConfig[],
  values: { [x: string]: any }
) => {
  let show = true
  for (const crit of criteria)
    for (const field of fields) {
      if (crit.id === field.id) show = isShow(crit, values[field.name])

      if ((operator === 'AND' && !show) || (operator === 'OR' && show)) break
    }

  return show
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

              let showField = true
              if (showIf !== undefined)
                showField = handleShowif(showIf, fields, formik.values)

              return (
                showField && (
                  <div style={{ margin: '1rem' }} key={id}>
                    <Field
                      config={fieldConfig}
                      value={formik.values[fieldConfig.name]}
                      onChange={formik.handleChange}
                    />
                  </div>
                )
              )
            }
          )}
        </Fragment>
      ))}
    </form>
  )
}

export default Form
