import React from 'react'

type LabelProps = {
  htmlFor: string
  text: string
}

const Label = ({ text, ...attrs }: LabelProps) => (
  <label {...attrs} style={{ margin: '0 .5rem' }}>
    {text}
  </label>
)

export default Label
