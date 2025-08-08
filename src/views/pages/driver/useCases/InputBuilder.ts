import type { InputAndEditorInterface } from '@/views/components/InputsAndEditors/entities/contracts/InputAndEditorInterface'
import { ref, type Ref } from 'vue'
import { BaseInputBuilder } from '@/views/components/InputsAndEditors/entities/contracts/BaseInputBuilder'
import { useCountryStore } from '../../country/store/country'
import type { CountryInterface } from '../../country/entities/contracts/CountryInterface'
import type { OptionInterface } from '@/views/components/InputsAndEditors/entities/contracts/OptionInterface'

type CountryTypeStoreType = ReturnType<typeof useCountryStore>

export class InputBuilder extends BaseInputBuilder {
  private countryStore: CountryTypeStoreType

  private countryOptions: Ref<OptionInterface[]> = ref([])

  private genderOptions: Ref<OptionInterface[]> = ref([
    {
      label: 'system.gender.items.male',
      value: 'male',
    },
    {
      label: 'system.gender.items.female',
      value: 'female',
    },
  ])

  protected inputs: InputAndEditorInterface[] = [
    {
      tag: 'input',
      type: 'text',
      name: 'email',
      field: 'value',
      label: 'driver.form.email',
      required: false,
      placeholder: 'driver.form.placeholder.email',
    },
    {
      tag: 'input',
      type: 'text',
      name: 'first_name',
      field: 'value',
      label: 'driver.form.first_name',
      required: false,
      placeholder: 'driver.form.placeholder.first_name',
    },
    {
      tag: 'input',
      type: 'text',
      name: 'last_name',
      field: 'value',
      label: 'driver.form.last_name',
      required: false,
      placeholder: 'driver.form.placeholder.last_name',
    },
    {
      tag: 'select',
      type: 'text',
      name: 'country_uuid',
      field: 'value',
      options: this.countryOptions.value,
      label: 'driver.form.country',
      required: true,
      placeholder: 'driver.form.placeholder.country',
    },
    {
      tag: 'input',
      type: 'phone',
      name: 'phone',
      field: 'value',
      label: 'driver.form.phone',
      required: true,
      placeholder: 'driver.form.placeholder.phone',
    },
    {
      tag: 'select',
      type: 'text',
      name: 'gender',
      field: 'value',
      options: this.genderOptions.value,
      label: 'system.gender.label',
      required: false,
      placeholder: 'system.gender.placeholder',
    },
  ]

  public constructor() {
    super()
    this.countryStore = useCountryStore()
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

  public initForm(data: { [key: string]: object }): this {
    this.form.email = data.email
    this.form.first_name = data.first_name
    this.form.last_name = data.last_name
    this.form.phone = data.phone
    this.form.gender = data.gender
    this.form.country_uuid = data.country_uuid
    this.form.avatar = ''

    return this
  }

  public mounted(): void {
    this.loadCountries()
  }
}
