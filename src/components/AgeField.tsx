import React, { useState } from 'react'
import Label from './Label'

type AgeInputProps = AgeFieldProps & {
  which: 'year' | 'month'
}

type AgeFieldProps = {
  label?: string
  name?: string
  readOnly?: boolean
  required?: boolean
  value?: number | ''
  onChange?: React.ChangeEventHandler<HTMLInputElement>
}

const MONTH_IN_YEAR = 12

function formatAge(value?: number | '') {
  let year
  let month

  if (value !== undefined && value !== '') {
    month = value

    if (month >= MONTH_IN_YEAR) {
      year = Math.floor(month / MONTH_IN_YEAR)
      month -= year * MONTH_IN_YEAR
    }
  }

  return { year, month }
}

function parseAge(age: { year?: number; month?: number }) {
  const { year, month } = age

  return year === undefined && month === undefined
    ? undefined
    : (year || 0) * MONTH_IN_YEAR + (month || 0)
}

function AgeInput({ name, value, which, onChange, ...attrs }: AgeInputProps) {
  const isPlural = value !== undefined && value > 1
  return (
    <>
      <input
        {...attrs}
        value={value}
        id={which}
        name={name}
        type="number"
        min={0}
        onChange={onChange}
        style={{ maxWidth: '5rem' }}
      />
      {isPlural ? ` ${which}s ` : ` ${which} `}
    </>
  )
}

function AgeField({
  label = '',
  name = '',
  value,
  onChange,
  ...attrs
}: AgeFieldProps) {
  const [age, setAge] = useState(formatAge(value))

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>,
    which: 'year' | 'month'
  ) {
    const newWhich =
      e.target.value === '' ? undefined : parseInt(e.target.value)
    const newAge = { ...age, [which]: newWhich }
    setAge(newAge)

    if (onChange) {
      const newParsed = parseAge(newAge)
      const newValue =
        newParsed !== undefined ? newParsed.toString() : undefined
      onChange({
        target: { name, value: newValue, type: 'number' },
      } as React.ChangeEvent<HTMLInputElement>)
    }
  }

  return (
    <>
      {label && <Label htmlFor={name} text={label} />}
      <AgeInput
        {...attrs}
        value={age.year}
        which="year"
        onChange={(e) => handleChange(e, 'year')}
      />
      <AgeInput
        {...attrs}
        value={age.month}
        which="month"
        onChange={(e) => handleChange(e, 'month')}
      />
      <div
        style={{
          color: '#999',
          fontSize: '.8rem',
          fontStyle: 'italic',
          textAlign: 'right',
          marginTop: '.5rem',
        }}
      >
        {value !== undefined && value !== ''
          ? `Total ${value} ${value < 2 ? 'month' : 'months'}`
          : `Total ?? month`}
      </div>
    </>
  )
}

export default AgeField
