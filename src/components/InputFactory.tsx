import React from 'react'
import Checkbox from './Checkbox'
import Select from './Select'
import TextField from './TextField'
import Radio from './Radio'

type InputConfig = {
  type: string
  name: string
  label: string
  options?: string[]
  [key: string]: any
}

type InputFactoryProps = {
  config: InputConfig
  value: any
  onChange(event: any): void
}

const InputFactory = ({ config, value, onChange }: InputFactoryProps) => {
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
          options={options ? options : []}
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
          options={options ? options : []}
          value={value}
          onChange={onChange}
          {...props}
        />
      )
    default:
      return null
  }
}

export default InputFactory
