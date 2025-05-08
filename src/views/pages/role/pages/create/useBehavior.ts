import { reactive, type Reactive } from 'vue'
import type { RoleInterface } from '../../entities/contracts/RoleInterface'
import { useRoleStorage } from '../../store/role'
import { toast } from 'vue3-toastify'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { RouteName } from '../../routes/RouteName'
import { useInput } from '../../useCases/useInputs'

export default function () {
  const store = useRoleStorage()
  const router = useRouter()
  const { t } = useI18n()

  const form: Reactive<RoleInterface> = reactive({
    uuid: '',
    value: '',
    description: '',
    is_super_admin: false,
  })

  const inputs = useInput()

  const getFormData = (): RoleInterface => form

  const create = () => {
    store.createAsync(getFormData()).then(() => {
      router.push({ name: RouteName.INDEX }).then(() => {
        toast.success(t('role.flash_messages.success.role_was_created'))
      })
    })
  }

  return {
    form,
    inputs,
    create,
  }
}
