import React, { useState, useEffect, Fragment } from 'react'
import Label from './Label'
import { FieldOption } from '../model'

type RadioProps = {
  label?: string
  name?: string
  options?: FieldOption[]
  disabled?: boolean
  required?: boolean
  value?: string
  onChange?(event: any): void
}

const Radio = ({
  label,
  name = '',
  options,
  disabled,
  value,
  onChange,
  ...attrs
}: RadioProps) => {
  const [radioValue, setRadioValue] = useState(value || undefined)
  useEffect(() => {
    if (onChange && name) {
      onChange({
        target: {
          name,
          value: radioValue,
        },
      })
    }
  }, [name, onChange, radioValue])

  return (
    <>
      {label && <Label text={label} htmlFor={name} />}
      {options &&
        options.map(({ label, value }) => (
          <Fragment key={value}>
            <input
              {...attrs}
              id={value}
              name={name}
              type="radio"
              value={value}
              checked={value === radioValue}
              onChange={disabled ? undefined : () => setRadioValue(value)}
            />
            <Label text={label || value} htmlFor={value} />
          </Fragment>
        ))}
    </>
  )
}

export default Radio
