import type { InputAndEditorInterface } from '@/views/components/InputsAndEditors/entities/contracts/InputAndEditorInterface'

export const useInput = (): InputAndEditorInterface[] => [
  {
    tag: 'input',
    type: 'text',
    name: 'value',
    field: 'value',
    label: 'role.form.value',
    required: true,
    placeholder: 'role.form.placeholder.value',
  },
  {
    tag: 'textarea',
    type: 'text',
    name: 'description',
    field: 'value',
    label: 'role.form.description',
    required: true,
    placeholder: 'role.form.placeholder.description',
  },
  {
    tag: 'input',
    type: 'checkbox',
    name: 'is_super_admin',
    field: 'is_super_admin',
    label: 'role.form.is_super_admin',
    required: false,
    placeholder: 'role.form.placeholder.is_super_admin',
  },
]
