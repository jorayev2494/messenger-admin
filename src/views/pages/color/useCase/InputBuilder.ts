import type { InputAndEditorInterface } from '@/views/components/InputsAndEditors/entities/contracts/InputAndEditorInterface'
import type { OptionInterface } from '@/views/components/InputsAndEditors/entities/contracts/OptionInterface'
import type { Store } from 'pinia'
import { ref, type Ref } from 'vue'
import { BaseInputBuilder } from '@/views/components/InputsAndEditors/entities/contracts/BaseInputBuilder'

export class InputBuilder extends BaseInputBuilder {
  private store: Store<'color'>

  protected inputs: InputAndEditorInterface[] = [
    {
      tag: 'input',
      type: 'text',
      name: 'name',
      field: 'value',
      label: 'color.form.name',
      required: true,
      placeholder: 'color.form.placeholder.name',
    },
    {
      tag: 'input',
      type: 'color',
      name: 'hex',
      field: 'value',
      label: 'color.form.hex',
      required: true,
      placeholder: 'color.form.placeholder.hex',
    },
    {
      tag: 'input',
      type: 'checkbox',
      name: 'is_active',
      field: 'is_active',
      label: 'color.form.is_active',
      required: false,
      placeholder: 'color.form.placeholder.is_active',
    },
  ]

  public constructor(store: Store<'color'>) {
    super()
    this.store = store
  }
}
