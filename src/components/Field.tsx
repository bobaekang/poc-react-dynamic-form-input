import React from 'react'
import Checkbox from './Checkbox'
import Select from './Select'
import TextField from './TextField'
import Radio from './Radio'
import AgeField from './AgeField'
import { SelectOption } from '../model'

type FieldConfig = {
  type: string
  name: string
  label: string
  radioOptions?: string[]
  selectOptions?: SelectOption[]
  [key: string]: any
}

type FieldProps = {
  config: FieldConfig
  value: any
  onChange(event: any): void
}

const Field = ({ config, value, onChange }: FieldProps) => {
  const { type, name, label, radioOptions, selectOptions, ...props } = config

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
          options={selectOptions ? selectOptions : []}
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
          options={radioOptions ? radioOptions : []}
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
