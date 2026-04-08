import type { InputAndEditorInterface } from '@/views/components/InputsAndEditors/entities/contracts/InputAndEditorInterface'
import type { OptionInterface } from '@/views/components/InputsAndEditors/entities/contracts/OptionInterface'
import { ref, type Ref } from 'vue'
import { BaseInputBuilder } from '@/views/components/InputsAndEditors/entities/contracts/BaseInputBuilder'
import { useDriverStore } from '../../driver/store/driver'
import { useBrandStore } from '../../brand/store/brand'
import { useModelStore } from '../../model/store/model'
import { useColorStore } from '../../color/store/color'

type OwnerStoreType = ReturnType<typeof useDriverStore>
type BrandStoreType = ReturnType<typeof useBrandStore>
type ModelStoreType = ReturnType<typeof useModelStore>
type ColorStoreType = ReturnType<typeof useColorStore>

export class InputBuilder extends BaseInputBuilder {
  private ownerStore: OwnerStoreType

  private brandStore: BrandStoreType

  private modelStore: ModelStoreType

  private colorStore: ColorStoreType

  public ownerOptions: Ref<OptionInterface[]> = ref([])

  private brandOptions: Ref<OptionInterface[]> = ref([])

  private modelOptions: Ref<OptionInterface[]> = ref([])

  private colorOptions: Ref<OptionInterface[]> = ref([])

  protected inputs: InputAndEditorInterface[] = [
    {
      tag: 'select',
      type: 'text',
      name: 'owner_uuid',
      field: 'value',
      options: this.ownerOptions.value,
      label: 'car.form.owner',
      required: true,
      placeholder: 'car.form.placeholder.owner',
      events: {
        change: (event: Event): void => {
          const { target }: { target: any } = event

          console.log('Yes', event, target.value)
        },
      },
    },
    {
      tag: 'select',
      type: 'text',
      name: 'brand_uuid',
      field: 'value',
      options: this.brandOptions.value,
      label: 'car.form.brand',
      required: true,
      placeholder: 'car.form.placeholder.brand',
      events: {
        change: (): void => {
          this.form.model_uuid = null
          this.loadModels()
        },
      },
    },
    {
      tag: 'select',
      type: 'text',
      name: 'model_uuid',
      field: 'value',
      options: this.modelOptions.value,
      label: 'car.form.model',
      required: true,
      placeholder: 'car.form.placeholder.model',
      events: {
        change: (event: Event): void => {
          const { target }: { target: any } = event

          console.log('Yes', event, target.value, typeof target)
        },
      },
    },
    {
      tag: 'select',
      type: 'text',
      name: 'color_uuid',
      field: 'value',
      options: this.colorOptions.value,
      label: 'car.form.color',
      required: true,
      placeholder: 'car.form.placeholder.color',
      events: {
        change: (event: Event): void => {
          const { target }: { target: any } = event

          console.log('Yes', event, target.value, typeof target)
        },
      },
    },
    {
      tag: 'input',
      type: 'text',
      name: 'vin',
      field: 'value',
      label: 'car.form.vin',
      required: true,
      placeholder: 'car.form.placeholder.vin',
    },
  ]

  public constructor() {
    super()
    this.ownerStore = useDriverStore()
    this.brandStore = useBrandStore()
    this.modelStore = useModelStore()
    this.colorStore = useColorStore()
  }

  private loadOwners(): void {
    this.ownerStore.listAsync().then((response) => {
      response.data
        .map(
          (client): OptionInterface => ({
            label: client.first_name,
            value: client.uuid,
          }),
        )
        .forEach((option): void => {
          this.ownerOptions.value.push(option)
        })
    })
  }

  private loadBrands(): void {
    this.brandStore.listAsync().then((response) => {
      response.data
        .map(
          (brand): OptionInterface => ({
            label: brand.name,
            value: brand.uuid,
          }),
        )
        .forEach((option): void => {
          this.brandOptions.value.push(option)
        })
    })
  }

  private loadModels(): void {
    this.modelOptions.value.splice(0)
    const params = {
      filters: {
        brand_uuid: this.form.brand_uuid,
      },
    }
    this.modelStore.listAsync({ params }).then((response) => {
      response.data
        .map(
          (brand): OptionInterface => ({
            label: brand.name,
            value: brand.uuid,
          }),
        )
        .forEach((option: OptionInterface): void => {
          this.modelOptions.value.push(option)
        })
    })
  }

  private loadColors(): void {
    this.colorStore.listAsync().then((response) => {
      response.data
        .map(
          (brand): OptionInterface => ({
            label: brand.name,
            value: brand.uuid,
          }),
        )
        .forEach((option): void => {
          this.colorOptions.value.push(option)
        })
    })
  }

  public initForm(data: { [key: string]: any }): this {
    this.form.owner_uuid = data.owner.uuid
    this.form.brand_uuid = data.brand.uuid
    this.form.model_uuid = data.model.uuid
    this.form.color_uuid = data.color.uuid
    this.form.vin = data.vin

    return this
  }

  public mounted(): void {
    this.loadOwners()
    this.loadBrands()
    this.loadModels()
    this.loadColors()
  }
}
