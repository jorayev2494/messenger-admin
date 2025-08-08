import { useRoute, useRouter } from 'vue-router'
import { useColorStore } from '../../store/color'
import { onMounted, reactive } from 'vue'
import { toast } from 'vue3-toastify'
import { useI18n } from 'vue-i18n'
import type { AxiosResponse } from 'axios'
import type { ColorInterface } from '../../entities/contracts/ColorInterface'
import { InputBuilder } from '../../useCase/InputBuilder'

export default function () {
  const router = useRouter()
  const route = useRoute()
  const { t } = useI18n()
  const store = useColorStore()
  const inputBuilder = new InputBuilder()

  const { uuid } = <{ uuid: string }>route.params

  const form = reactive({
    name: '',
    hex: '',
    is_active: false,
  })

  const getData = (): object => form

  const initForm = (model: ColorInterface): void => {
    form.name = model.name
    form.hex = model.hex
    form.is_active = model.is_active
  }

  const load = () => {
    store.showAsync(uuid).then((response: AxiosResponse<ColorInterface>): void => {
      initForm(response.data)
    })
  }

  const update = (): void => {
    store.updateAsync(uuid, getData()).then((): void => {
      // router.push(Tr.route({ name: RouteName.INDEX })).then(() => {
      toast.success(t('color.flash_messages.success.color_was_updated'))
      // })
    })
  }

  onMounted(() => {
    load()
  })

  return {
    form,
    inputBuilder,
    update,
  }
}
