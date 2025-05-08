import { useRouter } from 'vue-router'
import { useManagerStore } from '../../store/manager'
import { useInput } from '../../useCases/useInput'
import Tr from '@/infrastructure/translations/translation'
import { reactive, type Reactive } from 'vue'
import { RouteName } from '../../routes/RouteName'
import { toast } from 'vue3-toastify'
import { useI18n } from 'vue-i18n'

export default function () {
  const router = useRouter()
  const { t } = useI18n()
  const store = useManagerStore()

  const form = reactive({})

  const inputs = useInput()

  const getData = () => form

  const create = (): void => {
    store.createAsync(getData()).then((): void => {
      router.push(Tr.route({ name: RouteName.INDEX })).then(() => {
        toast.success(t('manager.flash_messages.success.manager_was_created'))
      })
    })
  }

  return {
    form,
    inputs,
    create,
  }
}
