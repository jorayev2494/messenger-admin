import { useRoute } from 'vue-router'
import { useModelStore } from '../../store/model'
import { onMounted, reactive } from 'vue'
import type { AxiosResponse } from 'axios'
import type { ModelInterface } from '../../entities/contracts/ModelInterface'
import type { InputAndEditorInterface } from '@/views/components/InputsAndEditors/entities/contracts/InputAndEditorInterface'
import useChangeImage from '@/views/components/changeImage/useChangeImage'
import { InputBuilder } from '../../useCases/InputBuilder'

export default function () {
  const route = useRoute()
  const store = useModelStore()
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
    store.showAsync(uuid).then((response: AxiosResponse<ModelInterface>): void => {
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
    inputBuilder,
  }
}
