import type { InputAndEditorInterface } from '@/views/components/InputsAndEditors/entities/contracts/InputAndEditorInterface'

export const useInput = (): InputAndEditorInterface[] => [
  {
    tag: 'input',
    type: 'text',
    name: 'email',
    field: 'value',
    label: 'manager.form.email',
    required: true,
    placeholder: 'manager.form.placeholder.email',
  },
  {
    tag: 'input',
    type: 'text',
    name: 'first_name',
    field: 'value',
    label: 'manager.form.first_name',
    required: true,
    placeholder: 'manager.form.placeholder.first_name',
  },
  {
    tag: 'input',
    type: 'text',
    name: 'last_name',
    field: 'value',
    label: 'manager.form.last_name',
    required: true,
    placeholder: 'manager.form.placeholder.last_name',
  },
]
