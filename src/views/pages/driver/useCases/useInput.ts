import type { InputAndEditorInterface } from '@/views/components/InputsAndEditors/entities/contracts/InputAndEditorInterface'
import type { OptionInterface } from '@/views/components/InputsAndEditors/entities/contracts/OptionInterface'

export const useInput = (genderOptions: Array<OptionInterface> = []): InputAndEditorInterface[] => [
  {
    tag: 'input',
    type: 'text',
    name: 'email',
    field: 'value',
    label: 'driver.form.email',
    required: true,
    placeholder: 'driver.form.placeholder.email',
  },
  {
    tag: 'input',
    type: 'text',
    name: 'first_name',
    field: 'value',
    label: 'driver.form.first_name',
    required: true,
    placeholder: 'driver.form.placeholder.first_name',
  },
  {
    tag: 'input',
    type: 'text',
    name: 'last_name',
    field: 'value',
    label: 'driver.form.last_name',
    required: true,
    placeholder: 'driver.form.placeholder.last_name',
  },
  {
    tag: 'input',
    type: 'phone',
    name: 'phone',
    field: 'value',
    label: 'driver.form.phone',
    required: true,
    placeholder: 'driver.form.placeholder.phone',
  },
  {
    tag: 'select',
    type: 'text',
    name: 'gender',
    field: 'value',
    options: genderOptions,
    label: 'system.gender.label',
    required: true,
    placeholder: 'system.gender.placeholder',
  },
]
