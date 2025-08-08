import { useRoute, useRouter } from 'vue-router'
import { useCountryStore } from '../../store/country'
import { onMounted, reactive } from 'vue'
import { toast } from 'vue3-toastify'
import { useI18n } from 'vue-i18n'
import type { AxiosResponse } from 'axios'
import type { CountryInterface } from '../../entities/contracts/CountryInterface'
import { InputBuilder } from '../../useCase/InputBuilder'

export default function () {
  const router = useRouter()
  const route = useRoute()
  const { t } = useI18n()
  const store = useCountryStore()
  const inputBuilder = new InputBuilder(store)

  const { uuid } = <{ uuid: string }>route.params

  const form = reactive({
    name: '',
    latitude: '',
    longitude: '',
    flag: '',
    phoneCode: '',
    is_active: false,
  })

  const getData = (): object => form

  const initForm = (model: CountryInterface): void => {
    form.name = model.name
    form.latitude = model.latitude
    form.longitude = model.longitude
    form.flag = model.flag
    form.phone_code = model.phone_code
    form.is_active = model.is_active
  }

  const load = () => {
    store.showAsync(uuid).then((response: AxiosResponse<CountryInterface>): void => {
      initForm(response.data)
    })
  }

  const update = (): void => {
    store.updateAsync(uuid, getData()).then((): void => {
      // router.push(Tr.route({ name: RouteName.INDEX })).then(() => {
      toast.success(t('model.flash_messages.success.model_was_updated'))
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
