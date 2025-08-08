import { useRoute } from 'vue-router'
import { useColorStore } from '../../store/color'
import { onMounted, reactive } from 'vue'
import type { AxiosResponse } from 'axios'
import useChangeImage from '@/views/components/changeImage/useChangeImage'
import { InputBuilder } from '../../useCase/InputBuilder'
import type { ColorInterface } from '../../entities/contracts/ColorInterface'

export default function () {
  const route = useRoute()
  const store = useColorStore()
  const inputBuilder = new InputBuilder()
  const { preview: logoPreview } = useChangeImage('logo')

  const { uuid } = <{ uuid: string }>route.params

  const form = reactive({
    slug: '',
    hex: '',
    is_active: '',
  })

  const load = () => {
    store.showAsync(uuid).then((response: AxiosResponse<ColorInterface>): void => {
      form.name = response.data.name
      form.hex = response.data.hex
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
