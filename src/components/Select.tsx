import React from 'react'
import { SelectOption } from '../model'
import Label from './Label'

type SelectProps = {
  label?: string
  name?: string
  options: SelectOption[]
  placeholder?: string
  disabled?: boolean
  required?: boolean
  value?: string
  onChange?: React.ChangeEventHandler<HTMLSelectElement>
}

const Select = ({
  label,
  name,
  options,
  placeholder,
  ...attr
}: SelectProps) => (
  <>
    {label && <Label text={label} htmlFor={name || ''} />}
    <select
      {...attr}
      id={name}
      name={name}
      style={{
        minWidth: '200px',
      }}
    >
      {placeholder && (
        <option value="" hidden>
          {placeholder}
        </option>
      )}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label || option.value}
        </option>
      ))}
    </select>
  </>
)

export default Select
