import { useRouter } from 'vue-router'
import { useColorStore } from '../../store/color'
import Tr from '@/infrastructure/translations/translation'
import { reactive } from 'vue'
import { RouteName } from '../../routes/RouteName'
import { toast } from 'vue3-toastify'
import { useI18n } from 'vue-i18n'
import type { AxiosResponse } from 'axios'
import type { ColorInterface } from '../../entities/contracts/ColorInterface'
import { InputBuilder } from '../../useCase/InputBuilder'

export default function () {
  const router = useRouter()
  const { t } = useI18n()
  const store = useColorStore()
  const inputBuilder = new InputBuilder(store)

  const form = reactive({})

  const getData = (): object => form

  const create = (): void => {
    store.createAsync(getData()).then(({ data }: AxiosResponse<ColorInterface>): void => {
      router.push(Tr.route({ name: RouteName.EDIT, params: { uuid: data.uuid } })).then(() => {
        toast.success(t('country.flash_messages.success.country_was_created'))
      })
    })
  }

  return {
    form,
    inputBuilder,
    create,
  }
}
