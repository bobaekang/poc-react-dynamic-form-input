import React, { useEffect, Fragment } from 'react'
import { useFormik } from 'formik'
import Field from './Field'
import { Config, FieldConfig, showIfCriterion } from '../model'

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

const handleShowif = (
  showIf: showIfCriterion[],
  fields: FieldConfig[],
  values: { [x: string]: any }
) => {
  let showField = true
  for (const showIfCrit of showIf)
    for (const field of fields) {
      if (showIfCrit.id === field.id)
        showField = checkShowIf(showIfCrit, values[field.name])

      if (showField) break
    }
  return showField
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
