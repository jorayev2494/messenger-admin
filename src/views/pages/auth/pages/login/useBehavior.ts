import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'
import { useI18n } from 'vue-i18n'
import useAuth from '@/services/auth/useAuth'
import type { LoginInterface } from '../../Entities/Contracts/Forms/LoginInterface'
import { useAuthStore } from '../../store/auth'

export default function () {
  const store = useAuthStore()
  const router = useRouter()
  const { t } = useI18n()

  const form: LoginInterface = reactive({
    email: 'admin@gmail.com',
    password: '12345Secret!',
  })

  const getData = (): LoginInterface => form

  const login = () => {
    useAuth.login(getData()).then(() => {
      router.push({ name: 'dashboard' }).then(() => {
        toast.success(
          t('auth.login.flash_messages.success.welcome', {
            first_name: store.getAuthData?.first_name,
          }),
        )
      })
    })
  }

  return {
    form,

    login,
  }
}
