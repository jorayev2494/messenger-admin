import { useRoute } from 'vue-router'
import { useCountryStore } from '../../store/country'
import { onMounted, reactive } from 'vue'
import type { AxiosResponse } from 'axios'
import type { CountryInterface } from '../../entities/contracts/CountryInterface'
import type { InputAndEditorInterface } from '@/views/components/InputsAndEditors/entities/contracts/InputAndEditorInterface'
import useChangeImage from '@/views/components/changeImage/useChangeImage'
import { InputBuilder } from '../../useCases/InputBuilder'

export default function () {
  const route = useRoute()
  const store = useCountryStore()
  const inputBuilder = new InputBuilder(store)
    .build()
    .map((input: InputAndEditorInterface): InputAndEditorInterface => {
      input.required = false
      input.readonly = true

      return input
    })
  const { preview: logoPreview } = useChangeImage('logo')

  const { uuid } = <{ uuid: string }>route.params

  const form = reactive({
    slug: '',
    name: '',
    founded_year: '',
    logo: '',
    is_active: '',
  })

  const load = () => {
    store.showAsync(uuid).then((response: AxiosResponse<CountryInterface>): void => {
      // logoPreview.value = response.data.flag !== null ? response.data.flag?.url : logoPreview.value
      form.name = response.data.name
      // form.founded_year = response.data.founded_year
      // form.logo = ''
      // form.is_active = response.data.is_active
    })
  }

  onMounted(() => {
    load()
  })

  return {
    form,
    logoPreview,
    inputBuilder,
  }
}
