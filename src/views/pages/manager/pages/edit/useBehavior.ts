import { useRoute, useRouter } from 'vue-router'
import { useManagerStore } from '../../store/manager'
import { useInput } from '../../useCases/useInput'
import Tr from '@/infrastructure/translations/translation'
import { onMounted, reactive } from 'vue'
import { RouteName } from '../../routes/RouteName'
import { toast } from 'vue3-toastify'
import { useI18n } from 'vue-i18n'
import type { AxiosResponse } from 'axios'
import type { ManagerInterface } from '../index/Entities/Contracts/ManagerInterface'

export default function () {
  const router = useRouter()
  const route = useRoute()
  const { t } = useI18n()
  const store = useManagerStore()

  const { uuid } = <{ uuid: string }>route.params

  const form = reactive({
    email: '',
    first_name: '',
    last_name: '',
  })

  const inputs = useInput()

  const getData = () => form

  const load = () => {
    store.showAsync(uuid).then((response: AxiosResponse<ManagerInterface>): void => {
      form.email = response.data.email
      form.first_name = response.data.first_name
      form.last_name = response.data.last_name
    })
  }

  const update = (): void => {
    store.updateAsync(uuid, getData()).then((): void => {
      router.push(Tr.route({ name: RouteName.INDEX })).then(() => {
        toast.success(t('manager.flash_messages.success.manager_was_updated'))
      })
    })
  }

  onMounted(() => {
    load()
  })

  return {
    form,
    inputs,
    update,
  }
}
