import { useRouter } from 'vue-router'
import { useCarStore } from '../../store/car'
import { InputBuilder } from '../../useCase/InputBuilder'
import Tr from '@/infrastructure/translations/translation'
import { reactive, type Reactive } from 'vue'
import { RouteName } from '../../routes/RouteName'
import { toast } from 'vue3-toastify'
import { useI18n } from 'vue-i18n'
import type { InputAndEditorInterface } from '@/views/components/InputsAndEditors/entities/contracts/InputAndEditorInterface'
import type { AxiosResponse } from 'axios'
import type CarInterface from '../../entities/contracts/CarInterface'

export default function () {
  const router = useRouter()
  const { t } = useI18n()
  const store = useCarStore()

  // const form = reactive({})

  const inputs = new InputBuilder()
  inputs.mounted()
  // .map((input: InputAndEditorInterface): InputAndEditorInterface => {
  //   if (input.name === 'gender') {
  //     input.hide = true
  //   }

  //   return input
  // })

  const getData = () => inputs.form

  const create = (): void => {
    store.createAsync(getData()).then(({ data }: AxiosResponse<CarInterface>): void => {
      // router.push(Tr.route({ name: RouteName.EDIT, params: { uuid: data.uuid } })).then(() => {
      toast.success(t('car.flash_messages.success.car_was_created'))
      // })
    })
  }

  return {
    // form,
    inputs,
    create,
  }
}
