import type { InputAndEditorInterface } from '@/views/components/InputsAndEditors/entities/contracts/InputAndEditorInterface'
import type { OptionInterface } from '@/views/components/InputsAndEditors/entities/contracts/OptionInterface'
import type { Store } from 'pinia'
import { ref, type Ref } from 'vue'
import { BaseInputBuilder } from '@/views/components/InputsAndEditors/entities/contracts/BaseInputBuilder'

export class InputBuilder extends BaseInputBuilder {
  private store: Store<'country'>

  private flagOptions: Ref<OptionInterface[]> = ref([
    {
      label: '🇰🇿 Қазақстан',
      value: '🇰🇿',
    },
    {
      label: "🇺🇿 O'zbekiston",
      value: '🇺🇿',
    },
    {
      label: '🇹🇷 Türkiye',
      value: '🇹🇷',
    },
    {
      label: '🇹🇲 Türkmenistan',
      value: '🇹🇲',
    },
    {
      label: '🇺🇦 Україна',
      value: '🇺🇦',
    },
  ])

  protected inputs: InputAndEditorInterface[] = [
    {
      tag: 'input',
      type: 'text',
      name: 'name',
      field: 'value',
      label: 'country.form.name',
      required: true,
      placeholder: 'country.form.placeholder.name',
    },
    {
      tag: 'select',
      type: 'text',
      name: 'flag',
      field: 'value',
      options: this.flagOptions.value,
      label: 'country.form.flag',
      required: true,
      placeholder: 'country.form.placeholder.flag',
    },
    {
      tag: 'input',
      type: 'text',
      name: 'latitude',
      field: 'value',
      label: 'country.form.latitude',
      required: true,
      placeholder: 'country.form.placeholder.latitude',
    },
    {
      tag: 'input',
      type: 'text',
      name: 'longitude',
      field: 'value',
      label: 'country.form.longitude',
      required: true,
      placeholder: 'country.form.placeholder.longitude',
    },
    {
      tag: 'input',
      type: 'text',
      name: 'phone_code',
      field: 'value',
      label: 'country.form.phone_code',
      required: true,
      placeholder: 'country.form.placeholder.phone_code',
    },
    {
      tag: 'input',
      type: 'checkbox',
      name: 'is_active',
      field: 'is_active',
      label: 'country.form.is_active',
      required: false,
      placeholder: 'country.form.placeholder.is_active',
    },
  ]

  public constructor(store: Store<'country'>) {
    super()
    this.store = store
  }
}
