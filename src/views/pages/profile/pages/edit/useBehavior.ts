import { onMounted, reactive, type Reactive } from 'vue'
import { useProfileStore } from '../../store/profile'
import { useInput } from '../../useCases/useInput'
import { toast } from 'vue3-toastify'
import { useI18n } from 'vue-i18n'
import type { ProfileInterface } from '../../entities/contracts/ProfileInterface'
import type { AxiosResponse } from 'axios'

export default function () {
  const store = useProfileStore()
  const { t } = useI18n()
  const inputs = useInput()

  const form: Reactive<ProfileInterface> = reactive({
    email: '',
    first_name: '',
    last_name: '',
  })

  const load = (): void => {
    store.showAsync().then((response: AxiosResponse<ProfileInterface>) => {
      const { data } = response

      form.email = data.email
      form.first_name = data.first_name
      form.last_name = data.last_name
    })
  }

  const getFormData = () => form

  const update = () => {
    store.updateAsync(getFormData()).then(() => {
      toast.success(t('profile.flash_messages.success.profile_was_updated'))
    })
  }

  onMounted((): void => {
    load()
  })

  return {
    form,
    inputs,
    update,
  }
}
