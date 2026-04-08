import type { InputAndEditorInterface } from '@/views/components/InputsAndEditors/entities/contracts/InputAndEditorInterface'
import type { OptionInterface } from '@/views/components/InputsAndEditors/entities/contracts/OptionInterface'
import type { BrandInterface } from '../entities/contracts/BrandInterface'
import { ref, type Ref } from 'vue'
import { BaseInputBuilder } from '@/views/components/InputsAndEditors/entities/contracts/BaseInputBuilder'
import { useBrandStore } from '../../brand/store/brand'
import { useBodyStore } from '../store/body'
import { useEngineStore } from '../store/engine'
import type { BodyInterface } from '../entities/contracts/BodyInterface'
import type { EngineInterface } from '../entities/contracts/EngineInterface'

type BrandStoreType = ReturnType<typeof useBrandStore>
type BodyStoreType = ReturnType<typeof useBodyStore>
type EngineStoreType = ReturnType<typeof useEngineStore>

export class InputBuilder extends BaseInputBuilder {
  private brandStore: BrandStoreType
  private bodyStore: BodyStoreType
  private engineStore: EngineStoreType

  private brandOptions: Ref<OptionInterface[]> = ref([])
  private bodyOptions: Ref<OptionInterface[]> = ref([])
  private engineOptions: Ref<OptionInterface[]> = ref([])

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
      tag: 'select',
      type: 'text',
      name: 'body_type',
      field: 'value',
      options: this.bodyOptions.value,
      label: 'model.form.body_type',
      required: false,
      placeholder: 'model.form.placeholder.body_type',
    },
    {
      tag: 'select',
      type: 'text',
      name: 'engine_type',
      field: 'value',
      options: this.engineOptions.value,
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

  public constructor() {
    super()
    this.brandStore = useBrandStore()
    this.bodyStore = useBodyStore()
    this.engineStore = useEngineStore()
  }

  public initForm(data: { [key: string]: object }): this {
    // this.form.email = data.email
    // this.form.first_name = data.first_name
    // this.form.last_name = data.last_name
    // this.form.phone = data.phone
    // this.form.date_of_birth = data.date_of_birth
    // this.form.gender = data.gender
    // this.form.country_uuid = data.country_uuid
    // this.form.avatar = ''

    this.form.name = data.name
    this.form.brand_uuid = data.brand_uuid
    this.form.generation = data.generation
    this.form.body_type = data.body_type
    this.form.engine_type = data.engine_type
    this.form.seats_count = data.seats_count
    this.form.founded_year = data.founded_year
    this.form.is_active = data.is_active
    this.form.image = ''

    return this
  }

  public buildBrandOptions(): InputBuilder {
    this.brandStore.listAsync().then((response) => {
      response.data
        .map(
          (brand: BrandInterface): OptionInterface => ({
            value: brand.uuid,
            label: brand.name,
          }),
        )
        .forEach((option: OptionInterface) => this.brandOptions.value.push(option))
    })

    return this
  }

  public buildBodyOptions(): InputBuilder {
    this.bodyStore.listAsync({ params: {} }).then((response): void => {
      response.data
        .map(
          (body: BodyInterface): OptionInterface => ({
            label: body.label,
            value: body.value,
          }),
        )
        .forEach((option: OptionInterface) => this.bodyOptions.value.push(option))
    })

    return this
  }

  public buildEngineOptions(): InputBuilder {
    this.engineStore.listAsync({ params: {} }).then((response): void => {
      response.data
        .map(
          (engine: EngineInterface): OptionInterface => ({
            label: engine.label,
            value: engine.value,
          }),
        )
        .forEach((option: OptionInterface) => this.engineOptions.value.push(option))
    })

    return this
  }

  public mounted(): InputBuilder {
    this.buildBrandOptions()
    this.buildBodyOptions()
    this.buildEngineOptions()

    return this
  }
}
