export type GroupConfig = {
  id: number
  name: string
}

export type showIfCriterion = {
  id: number
  operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'ne'
  value: any
}

export type FieldConfig = {
  id: number
  groupId: number
  name: string
  type: string
  label: string
  options?: string[]
  defaultValue?: any
  showIf?: showIfCriterion
  [key: string]: any
}
