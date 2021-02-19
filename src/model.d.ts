export type GroupConfig = {
  id: number
  name: string
}

export type showIfCriterion = {
  id: number
  operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'ne'
  value: any
}

export type showIfCondition = {
  operator: 'AND' | 'OR'
  criteria: showIfCriterion[]
}

export type SelectOption = {
  value: string
  label?: string
  description?: string
}

export type FieldConfig = {
  id: number
  groupId: number
  name: string
  type: string
  label: string
  radioOptions?: string[]
  selectOptions?: SelectOption[]
  defaultValue?: any
  showIf?: showIfCondition
  [key: string]: any
}

export type Config = {
  groups: GroupConfig[]
  fields: FieldConfig[]
}
