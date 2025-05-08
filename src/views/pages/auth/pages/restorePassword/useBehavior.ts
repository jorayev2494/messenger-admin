import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { toast } from 'vue3-toastify'
import useAuth from '@/services/auth/useAuth'
import type { RestorePasswordInterface } from '../../Entities/Contracts/Forms/RestorePasswordInterface'

export default function (): object {
  const router = useRouter()
  const { t } = useI18n()

  const form: RestorePasswordInterface = reactive({
    code: null,
    password: '12345NewSecret!',
    password_confirmation: '12345NewSecret!',
  })

  const getData = (): RestorePasswordInterface => form

  const restorePassword = () => {
    useAuth.restorePassword(getData()).then(() => {
      router.push({ name: 'login' }).then(() => {
        toast.success(t('auth.restore_password.flash_messages.success.restore_password_sent'))
      })
    })
  }

  return {
    form,

    restorePassword,
  }
}
