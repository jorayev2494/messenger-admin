import { useRouter } from 'vue-router'
import { useCountryStore } from '../../store/country'
import Tr from '@/infrastructure/translations/translation'
import { reactive } from 'vue'
import { RouteName } from '../../routes/RouteName'
import { toast } from 'vue3-toastify'
import { useI18n } from 'vue-i18n'
import type { AxiosResponse } from 'axios'
import type { CountryInterface } from '../../entities/contracts/CountryInterface'
import { InputBuilder } from '../../useCase/InputBuilder'

export default function () {
  const router = useRouter()
  const { t } = useI18n()
  const store = useCountryStore()
  const inputBuilder = new InputBuilder(store)

  const form = reactive({})

  const getData = (): object => form

  const create = (): void => {
    store.createAsync(getData()).then(({ data }: AxiosResponse<CountryInterface>): void => {
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
