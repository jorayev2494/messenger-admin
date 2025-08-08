import { onMounted, reactive, type Reactive } from 'vue'
import { useProfileStore } from '../../store/profile'
import { useInput } from '../../useCases/useInput'
import { toast } from 'vue3-toastify'
import { useI18n } from 'vue-i18n'
import type { ProfileInterface } from '../../entities/contracts/ProfileInterface'
import type { AxiosResponse } from 'axios'
import useChangeImage from '@/views/components/changeImage/useChangeImage'

export default function () {
  const store = useProfileStore()
  const { t } = useI18n()
  const inputs = useInput()
  const { preview: avatarPreview, upload: uploadAvatar } = useChangeImage()

  const form: Reactive<ProfileInterface> = reactive({
    email: '',
    first_name: '',
    last_name: '',
    avatar: '',
  })

  const load = (): void => {
    store.showAsync().then((response: AxiosResponse<ProfileInterface>) => {
      const { data } = response

      avatarPreview.value = data.avatar !== null ? data.avatar?.url : avatarPreview.value

      form.email = data.email
      form.first_name = data.first_name
      form.last_name = data.last_name
      form.avatar = ''
    })
  }

  const getFormData = (): FormData => {
    const fd = new FormData()

    fd.append('email', form.email)
    fd.append('first_name', form.first_name)
    fd.append('last_name', form.last_name)
    fd.append('avatar', form.avatar)

    return fd
  }

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
    avatarPreview,
    inputs,
    update,
    uploadAvatar,
  }
}
