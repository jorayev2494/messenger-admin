import type { InputAndEditorInterface } from '@/views/components/InputsAndEditors/entities/contracts/InputAndEditorInterface'
import type { OptionInterface } from '@/views/components/InputsAndEditors/entities/contracts/OptionInterface'
import type { BrandInterface } from '../entities/contracts/BrandInterface'
import type { Store } from 'pinia'
import { ref, type Ref } from 'vue'
import { BaseInputBuilder } from '@/views/components/InputsAndEditors/entities/contracts/BaseInputBuilder'

export class InputBuilder extends BaseInputBuilder {
  private store: Store<'model'>

  private brandOptions: Ref<OptionInterface[]> = ref([])

  protected inputs: InputAndEditorInterface[] = [
    {
      tag: 'input',
      type: 'text',
      name: 'name',
      field: 'value',
      label: 'model.form.name',
      required: true,
      placeholder: 'model.form.placeholder.name',
    },
    {
      tag: 'select',
      type: 'text',
      name: 'brand_uuid',
      field: 'value',
      options: this.brandOptions.value,
      label: 'model.form.brand',
      required: true,
      placeholder: 'model.form.placeholder.brand',
    },
    {
      tag: 'input',
      type: 'text',
      name: 'generation',
      field: 'value',
      label: 'model.form.generation',
      required: false,
      placeholder: 'model.form.placeholder.generation',
    },
    {
      tag: 'input',
      type: 'text',
      name: 'body_type',
      field: 'value',
      label: 'model.form.body_type',
      required: false,
      placeholder: 'model.form.placeholder.body_type',
    },
    {
      tag: 'input',
      type: 'text',
      name: 'engine_type',
      field: 'value',
      label: 'model.form.engine_type',
      required: false,
      placeholder: 'model.form.placeholder.engine_type',
    },
    {
      tag: 'input',
      type: 'number',
      name: 'seats_count',
      field: 'value',
      label: 'model.form.seats_count',
      required: true,
      placeholder: 'model.form.placeholder.seats_count',
    },
    {
      tag: 'input',
      type: 'number',
      name: 'founded_year',
      field: 'value',
      label: 'model.form.founded_year',
      required: true,
      placeholder: 'model.form.placeholder.founded_year',
    },
    {
      tag: 'input',
      type: 'checkbox',
      name: 'is_active',
      field: 'is_active',
      label: 'model.form.is_active',
      required: false,
      placeholder: 'model.form.placeholder.is_active',
    },
  ]

  public constructor(store: Store<'model'>) {
    super()
    this.store = store
  }

  public build(): InputBuilder {
    this.buildBrandOptions()

    return this
  }

  public buildBrandOptions(): InputBuilder {
    const brandOptionMapper = (brand: BrandInterface): OptionInterface => ({
      value: brand.uuid,
      label: brand.name,
    })

    this.store.loadBrandListAsync().then((response) => {
      response.data
        .map(brandOptionMapper)
        .forEach((option: OptionInterface) => this.brandOptions.value.push(option))
    })

    return this
  }
}
