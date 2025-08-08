import type { OptionInterface } from './OptionInterface'

export interface InputAndEditorInterface {
  tag: string
  type: string
  name: string
  field: string
  label: string
  required: boolean
  placeholder?: string
  readonly?: boolean
  options?: Array<OptionInterface>
  hide?: boolean
  bind?: object
  events?: object
}
