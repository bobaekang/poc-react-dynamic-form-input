import React, { useState } from 'react'
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

function getDescriptionMap(options: SelectOption[]) {
  const descriptionMap: { [key: string]: string } = {}
  for (const { value, description } of options)
    descriptionMap[value] = description || ''

  return descriptionMap
}

const Select = ({
  label,
  name,
  options,
  placeholder,
  onChange,
  ...attr
}: SelectProps) => {
  const [description, setDescription] = useState('')
  const descriptionMap = getDescriptionMap(options)

  return (
    <>
      {label && <Label text={label} htmlFor={name || ''} />}
      <select
        {...attr}
        id={name}
        name={name}
        style={{
          minWidth: '200px',
        }}
        onChange={(e) => {
          setDescription(descriptionMap[e.target.value])
          if (onChange) onChange(e)
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
      <div style={{ textAlign: 'center', marginTop: '.2em', fontSize: '.8em' }}>
        {description && <em>{description}</em>}
      </div>
    </>
  )
}

export default Select
