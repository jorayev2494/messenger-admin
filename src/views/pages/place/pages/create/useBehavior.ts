import { useRouter } from 'vue-router'
import { usePlaceStore } from '../../store/place'
import { InputBuilder } from '../../useCase/InputBuilder'
import { toast } from 'vue3-toastify'
import { useI18n } from 'vue-i18n'
import type { AxiosResponse } from 'axios'
import type PlaceInterface from '../../entities/contracts/PlaceInterface'

export default function () {
  const router = useRouter()
  const { t } = useI18n()
  const store = usePlaceStore()

  const inputs = new InputBuilder()
  inputs.mounted()

  const getData = () => inputs.form

  const create = (): void => {
    store.createAsync(getData()).then(({ data }: AxiosResponse<PlaceInterface>): void => {
      // router.push(Tr.route({ name: RouteName.EDIT, params: { uuid: data.uuid } })).then(() => {
      toast.success(t('place.flash_messages.success.place_was_created'))
      // })
    })
  }

  return {
    // form,
    inputs,
    create,
  }
}
