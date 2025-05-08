import type { InputAndEditorInterface } from '@/views/components/InputsAndEditors/entities/contracts/InputAndEditorInterface'

export const useInput = (): InputAndEditorInterface[] => [
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
]
