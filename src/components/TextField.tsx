import React from 'react'
import Label from './Label'

type TextFieldProps = {
  label?: string
  name?: string
  type?: 'text' | 'password' | 'number'
  autoFocus?: boolean
  pattern?: string
  placeholder?: string
  readOnly?: boolean
  required?: boolean
  min?: number
  max?: number
  step?: number
  value?: string | number
  onChange?: React.ChangeEventHandler<HTMLInputElement>
}

const TextField = ({
  label = '',
  name = '',
  type = 'text',
  ...attrs
}: TextFieldProps) => {
  return (
    <>
      {label && <Label text={label} htmlFor={name} />}
      <input {...attrs} id={name} name={name} type={type} />
    </>
  )
}

export default TextField
