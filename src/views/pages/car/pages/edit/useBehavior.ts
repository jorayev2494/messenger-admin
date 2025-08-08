import { useRoute, useRouter } from 'vue-router'
import { useCarStore } from '../../store/car'
import { InputBuilder } from '../../useCase/InputBuilder'
import Tr from '@/infrastructure/translations/translation'
import { onMounted, reactive, type Reactive } from 'vue'
import { RouteName } from '../../routes/RouteName'
import { toast } from 'vue3-toastify'
import { useI18n } from 'vue-i18n'
import type { InputAndEditorInterface } from '@/views/components/InputsAndEditors/entities/contracts/InputAndEditorInterface'
import type { AxiosResponse } from 'axios'
import type CarInterface from '../../entities/contracts/CarInterface'

export default function () {
  const router = useRouter()
  const route = useRoute()
  const { t } = useI18n()
  const store = useCarStore()
  const { uuid } = <{ uuid: string }>route.params

  const inputs = new InputBuilder()
  inputs.mounted()

  const getData = (): object => inputs.form

  const load = () => {
    store.showAsync(uuid).then((response: AxiosResponse<CarInterface>): void => {
      inputs.initForm(response.data)
    })
  }

  const update = (): void => {
    store.updateAsync(uuid, getData()).then((): void => {
      // router.push(Tr.route({ name: RouteName.INDEX })).then(() => {
      toast.success(t('car.flash_messages.success.car_was_updated'))
      // })
    })
  }

  onMounted(() => {
    load()
  })

  return {
    inputs,
    update,
  }
}
