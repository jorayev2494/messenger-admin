import type { InputAndEditorInterface } from '@/views/components/InputsAndEditors/entities/contracts/InputAndEditorInterface'
import type { OptionInterface } from '@/views/components/InputsAndEditors/entities/contracts/OptionInterface'

export const useInput = (genderOptions: Array<OptionInterface> = []): InputAndEditorInterface[] => [
  {
    tag: 'input',
    type: 'text',
    name: 'name',
    field: 'value',
    label: 'brand.form.name',
    required: true,
    placeholder: 'brand.form.placeholder.name',
  },
  {
    tag: 'input',
    type: 'number',
    name: 'founded_year',
    field: 'value',
    label: 'brand.form.founded_year',
    required: true,
    placeholder: 'brand.form.placeholder.founded_year',
  },
  {
    tag: 'input',
    type: 'checkbox',
    name: 'is_active',
    field: 'is_active',
    label: 'brand.form.is_active',
    required: false,
    placeholder: 'brand.form.placeholder.is_active',
  },
]
