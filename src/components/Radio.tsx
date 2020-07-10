import React, { useState, useEffect, Fragment } from 'react'
import Label from './Label'

type RadioProps = {
  label?: string
  name?: string
  options?: string[]
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
        options.map((option) => (
          <Fragment key={option}>
            <input
              {...attrs}
              id={option}
              name={name}
              type="radio"
              value={option}
              checked={option === radioValue}
              onChange={disabled ? undefined : () => setRadioValue(option)}
            />
            <Label text={option} htmlFor={option} />
          </Fragment>
        ))}
    </>
  )
}

export default Radio
