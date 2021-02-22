import React from 'react'
import Checkbox from './Checkbox'
import Select from './Select'
import TextField from './TextField'
import Radio from './Radio'
import AgeField from './AgeField'
import { FieldOption } from '../model'

type FieldConfig = {
  type: string
  name: string
  label: string
  options?: FieldOption[]
  [key: string]: any
}

type FieldProps = {
  config: FieldConfig
  value: any
  onChange(event: any): void
}

const Field = ({ config, value, onChange }: FieldProps) => {
  const { type, name, label, options, ...props } = config

  switch (type) {
    case 'text':
    case 'number':
      return (
        <TextField
          type={type}
          name={name}
          label={label}
          value={value}
          onChange={onChange}
          {...props}
        />
      )
    case 'checkbox':
      return (
        <Checkbox
          name={name}
          label={label}
          checked={!!value}
          onChange={onChange}
          {...props}
        />
      )
    case 'select':
      return (
        <Select
          name={name}
          label={label}
          options={options || []}
          value={value}
          onChange={onChange}
          {...props}
        />
      )
    case 'radio':
      return (
        <Radio
          name={name}
          label={label}
          options={options || []}
          value={value}
          onChange={onChange}
          {...props}
        />
      )
    case 'age':
      return (
        <AgeField
          name={name}
          label={label}
          value={value}
          onChange={onChange}
          {...props}
        />
      )
    default:
      return null
  }
}

export default Field
