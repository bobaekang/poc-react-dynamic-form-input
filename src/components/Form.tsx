import React from 'react'
import { useFormik } from 'formik'
import Checkbox from './Checkbox'
import Select from './Select'
import TextField from './TextField'

type InputConfig = {
  type: string
  label: string
  options?: string[]
  [key: string]: any
}

type InputFactoryProps = {
  name: string
  config: InputConfig
  value: any
  onChange(event: any): void
}

const InputFactory = ({ name, config, value, onChange }: InputFactoryProps) => {
  const { type, label, options, ...props } = config
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
          checked={value}
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
    default:
      return null
  }
}

type FormProps = {
  config: {
    [key: string]: InputConfig
  }
  initialValues: {
    [key: string]: any
  }
}

const Form = ({ config, initialValues }: FormProps) => {
  const formik = useFormik({
    initialValues: { ...initialValues },
    onSubmit() {},
  })

  return (
    <form>
      {Object.keys(config).map((key) => (
        <div style={{ margin: '1rem' }} key={key}>
          <InputFactory
            name={key}
            config={config[key]}
            value={formik.values[key]}
            onChange={formik.handleChange}
          />
        </div>
      ))}
    </form>
  )
}

export default Form
