import { useRoute } from 'vue-router'
import { useBrandStore } from '../../store/brand'
import { useInput } from '../../useCases/useInput'
import { onMounted, reactive } from 'vue'
import type { AxiosResponse } from 'axios'
import type { BrandInterface } from '../../entities/contracts/BrandInterface'
import type { InputAndEditorInterface } from '@/views/components/InputsAndEditors/entities/contracts/InputAndEditorInterface'
import useChangeImage from '@/views/components/changeImage/useChangeImage'

export default function () {
  const route = useRoute()
  const store = useBrandStore()
  const { preview: logoPreview } = useChangeImage('logo')

  const { uuid } = <{ uuid: string }>route.params

  const form = reactive({
    slug: '',
    name: '',
    founded_year: '',
    logo: '',
    is_active: '',
  })

  const inputs = useInput().map((input: InputAndEditorInterface): InputAndEditorInterface => {
    input.required = false
    input.readonly = true

    return input
  })

  const load = () => {
    store.showAsync(uuid).then((response: AxiosResponse<BrandInterface>): void => {
      logoPreview.value = response.data.logo !== null ? response.data.logo?.url : logoPreview.value
      form.name = response.data.name
      form.founded_year = response.data.founded_year
      form.logo = ''
      form.is_active = response.data.is_active
    })
  }

  onMounted(() => {
    load()
  })

  return {
    form,
    logoPreview,
    inputs,
  }
}
