import type { InputAndEditorInterface } from '@/views/components/InputsAndEditors/entities/contracts/InputAndEditorInterface'
import type { OptionInterface } from '@/views/components/InputsAndEditors/entities/contracts/OptionInterface'

export const useInput = (genderOptions: Array<OptionInterface> = []): InputAndEditorInterface[] => [
  {
    tag: 'input',
    type: 'text',
    name: 'email',
    field: 'value',
    label: 'client.form.email',
    required: true,
    placeholder: 'client.form.placeholder.email',
  },
  {
    tag: 'input',
    type: 'text',
    name: 'first_name',
    field: 'value',
    label: 'client.form.first_name',
    required: true,
    placeholder: 'client.form.placeholder.first_name',
  },
  {
    tag: 'input',
    type: 'text',
    name: 'last_name',
    field: 'value',
    label: 'client.form.last_name',
    required: true,
    placeholder: 'client.form.placeholder.last_name',
  },
  {
    tag: 'input',
    type: 'phone',
    name: 'phone',
    field: 'value',
    label: 'client.form.phone',
    required: true,
    placeholder: 'client.form.placeholder.phone',
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
