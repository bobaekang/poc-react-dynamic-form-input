import React, { useEffect, useState } from 'react'
import Label from './Label'

type AgeFieldProps = {
  label?: string
  name?: string
  readOnly?: boolean
  required?: boolean
  value?: number
  onChange?: React.ChangeEventHandler<HTMLInputElement>
}

const DAY_IN_YEAR = 365
const DAY_IN_MONTH = 30

function formatAge(value?: number) {
  let year
  let month
  let day

  if (value !== undefined) {
    day = value

    if (day >= DAY_IN_YEAR) {
      year = Math.floor(day / DAY_IN_YEAR)
      day -= year * DAY_IN_YEAR
    }

    if (day >= DAY_IN_MONTH) {
      month = Math.floor(day / DAY_IN_MONTH)
      day -= month * DAY_IN_MONTH
    }
  }

  return { year, month, day }
}

function parseAge(age: { year?: number; month?: number; day?: number }) {
  const { year, month, day } = age

  return !year && !month && !day
    ? undefined
    : (year || 0) * DAY_IN_YEAR + (month || 0) * DAY_IN_MONTH + (day || 0)
}

const AgeField = ({
  label = '',
  name = '',
  value,
  onChange,
  ...attrs
}: AgeFieldProps) => {
  const [age, setAge] = useState(formatAge(value))

  useEffect(() => {
    const newAge = formatAge(value)
    if (
      age.year !== newAge.year ||
      age.month !== newAge.month ||
      age.day !== newAge.day
    )
      setAge(newAge)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  useEffect(() => {
    const newValue = parseAge(age)
    if (onChange && value !== newValue)
      onChange({
        target: {
          name,
          value: newValue !== undefined ? newValue.toString() : null,
          type: 'number',
        },
      } as React.ChangeEvent<HTMLInputElement>)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [age])

  return (
    <>
      {label && <Label text={label} htmlFor={name} />}
      <input
        {...attrs}
        value={age.year}
        id="year"
        name={name}
        type="number"
        min={0}
        size={5}
        onChange={(e) => {
          const newYear =
            e.target.value === '' ? undefined : parseInt(e.target.value)
          setAge((prevAge) => ({ ...prevAge, year: newYear }))
        }}
      />
      {' year(s) '}
      <input
        {...attrs}
        value={age.month}
        id="month"
        name={name}
        type="number"
        min={0}
        size={5}
        onChange={(e) => {
          const newMonth =
            e.target.value === '' ? undefined : parseInt(e.target.value)
          setAge((prevAge) => ({ ...prevAge, month: newMonth }))
        }}
      />
      {' month(s) '}
      <input
        {...attrs}
        value={age.day}
        id="day"
        name={name}
        type="number"
        min={0}
        size={5}
        onChange={(e) => {
          const newDay =
            e.target.value === '' ? undefined : parseInt(e.target.value)
          setAge((prevAge) => ({ ...prevAge, day: newDay }))
        }}
      />
      {' day(s)'}
    </>
  )
}

export default AgeField
