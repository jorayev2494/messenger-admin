import type { InputAndEditorInterface } from '@/views/components/InputsAndEditors/entities/contracts/InputAndEditorInterface'
import { ref, type Ref } from 'vue'
import { BaseInputBuilder } from '@/views/components/InputsAndEditors/entities/contracts/BaseInputBuilder'
import { useCountryStore } from '../../country/store/country'
import type { CountryInterface } from '../../country/entities/contracts/CountryInterface'
import type { OptionInterface } from '@/views/components/InputsAndEditors/entities/contracts/OptionInterface'
import { usePlaceStore } from '../store/place'
import type PlaceInterface from '../entities/contracts/PlaceInterface'
import { usePlaceTypeStore } from '../store/type'
import type TypeInterface from '../entities/contracts/TypeInterface'

type CountryStoreType = ReturnType<typeof useCountryStore>
type PlaceStoreType = ReturnType<typeof usePlaceStore>
type PlaceTypeStoreType = ReturnType<typeof usePlaceTypeStore>

export class InputBuilder extends BaseInputBuilder {
  private countryStore: CountryStoreType

  private placeStore: PlaceStoreType

  private placeTypeStore: PlaceTypeStoreType

  private countryOptions: Ref<OptionInterface[]> = ref([])

  private placeOptions: Ref<OptionInterface[]> = ref([])

  private placeTypeOptions: Ref<OptionInterface[]> = ref([])

  protected inputs: InputAndEditorInterface[] = [
    {
      tag: 'input',
      type: 'text',
      name: 'name',
      field: 'value',
      label: 'place.form.name',
      required: true,
      placeholder: 'place.form.placeholder.name',
    },
    {
      tag: 'input',
      type: 'text',
      name: 'latitude',
      field: 'value',
      label: 'place.form.latitude',
      required: true,
      placeholder: 'place.form.placeholder.latitude',
    },
    {
      tag: 'input',
      type: 'text',
      name: 'longitude',
      field: 'value',
      label: 'place.form.longitude',
      required: true,
      placeholder: 'place.form.placeholder.longitude',
    },
    {
      tag: 'select',
      type: 'text',
      name: 'country_uuid',
      field: 'value',
      options: this.countryOptions.value,
      label: 'place.form.country',
      required: true,
      placeholder: 'place.form.placeholder.country',
      events: {
        change: (event: Event): void => {
          const { target }: { target: any } = event

          this.loadPlaces({
            filters: {
              country_uuid: target.value,
            },
          })
        },
      },
    },
    {
      tag: 'select',
      type: 'text',
      name: 'type',
      field: 'value',
      options: this.placeTypeOptions.value,
      label: 'place.form.type',
      required: true,
      placeholder: 'place.form.placeholder.type',
      events: {
        change: (event: Event): void => {
          const { target }: { target: any } = event

          // this.loadPlaces({
          //   filters: {
          //     country_uuid: target.value,
          //   },
          // })
        },
      },
    },
    {
      tag: 'select',
      type: 'text',
      name: 'parent_uuid',
      field: 'value',
      options: this.placeOptions.value,
      label: 'place.form.parent',
      required: true,
      placeholder: 'place.form.placeholder.parent',
      events: {
        change: (event: Event): void => {
          const { target }: { target: any } = event

          console.log('Yes', event, target.value)
        },
      },
    },
    {
      tag: 'input',
      type: 'checkbox',
      name: 'is_active',
      field: 'is_active',
      label: 'system.is_active',
      required: false,
      placeholder: 'system.is_active',
    },
  ]

  public constructor() {
    super()
    this.countryStore = useCountryStore()
    this.placeStore = usePlaceStore()
    this.placeTypeStore = usePlaceTypeStore()
  }

  private loadCountries(): void {
    this.countryStore.listAsync().then((response) => {
      response.data
        .map(
          (country: CountryInterface): OptionInterface => ({
            label: country.name,
            value: country.uuid,
          }),
        )
        .forEach((option: OptionInterface): void => {
          this.countryOptions.value.push(option)
        })
    })
  }

  public loadPlaces(params: object = {}): void {
    this.form.parent_uuid = null
    this.placeOptions.value.splice(0)
    this.placeStore.listAsync({ params }).then((response) => {
      response.data
        .map(
          (place: PlaceInterface): OptionInterface => ({
            label: place.name,
            value: place.uuid,
          }),
        )
        .forEach((option: OptionInterface): void => {
          this.placeOptions.value.push(option)
        })
    })
  }

  private loadPlaceTypes(): void {
    this.placeTypeStore.listAsync().then((response) => {
      response.data
        .map(
          (type: TypeInterface): OptionInterface => ({
            label: type.label,
            value: type.value,
          }),
        )
        .forEach((option: OptionInterface): void => {
          this.placeTypeOptions.value.push(option)
        })
    })
  }

  public initForm(data: { [key: string]: any }): this {
    this.loadPlaces({
      filters: {
        country_uuid: data.country.uuid,
      },
    })

    this.form.name = data.name
    this.form.latitude = data.latitude
    this.form.longitude = data.longitude
    this.form.type = data.type
    this.form.country_uuid = data.country.uuid
    this.form.parent_uuid = data.parent.uuid
    this.form.is_active = data.is_active

    return this
  }

  public mounted(): void {
    this.loadCountries()
    this.loadPlaceTypes()
  }
}
