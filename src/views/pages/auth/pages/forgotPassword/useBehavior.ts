import { reactive } from 'vue'
import { useAuthStore } from '../../store/auth'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'
import { useI18n } from 'vue-i18n'
import useAuth from '@/services/auth/useAuth'
import type { ForgotPasswordInterface } from '../../Entities/Contracts/Forms/ForgotPasswordInterface'

export default function (): object {
  const router = useRouter()
  const store = useAuthStore()
  const { t } = useI18n()

  const form: ForgotPasswordInterface = reactive({
    email: 'manager@gmail.com',
    type: 'restore_password',
  })

  const getData = (): ForgotPasswordInterface => form

  const sendRequest = () => {
    useAuth.forgotPassword(getData()).then(() => {
      router.push({ name: 'restore-password' }).then(() => {
        toast.success(t('auth.forgot_password.flash_messages.success.forgot_password_sent'))
      })
    })
  }

  return {
    form,
    sendRequest,
  }
}
