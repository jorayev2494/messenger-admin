import { useRoute, useRouter } from 'vue-router'
import { useClientStore } from '../../store/client'
import { useInput } from '../../useCases/useInput'
import { onMounted, reactive } from 'vue'
import { toast } from 'vue3-toastify'
import { useI18n } from 'vue-i18n'
import type { AxiosResponse } from 'axios'
import type { ClientInterface } from '../../entities/contracts/ClientInterface'
import useChangeImage from '@/views/components/changeImage/useChangeImage'
import { InputBuilder } from '../../useCases/InputBuilder'
import type { InputAndEditorInterface } from '@/views/components/InputsAndEditors/entities/contracts/InputAndEditorInterface'

export default function () {
  const route = useRoute()
  const { t } = useI18n()
  const store = useClientStore()
  const { preview: avatarPreview, upload: uploadAvatar } = useChangeImage('avatar')

  const { uuid } = <{ uuid: string }>route.params

  const inputs = new InputBuilder().map(
    (input: InputAndEditorInterface): InputAndEditorInterface => {
      input.required = true

      return input
    },
  )
  inputs.mounted()

  const getData = (): FormData => {
    const fd = new FormData()

    fd.append('email', inputs.form.email)
    fd.append('first_name', inputs.form.first_name)
    fd.append('last_name', inputs.form.last_name)
    fd.append('avatar', inputs.form.avatar)
    fd.append('phone', inputs.form.phone)
    fd.append('country_uuid', inputs.form.country_uuid)
    fd.append('gender', inputs.form.gender)

    return fd
  }

  const load = () => {
    store.showAsync(uuid).then((response: AxiosResponse<ClientInterface>): void => {
      const { data } = response
      avatarPreview.value = data.avatar !== null ? data.avatar?.url : avatarPreview.value
      inputs.initForm(data)
    })
  }

  const update = (): void => {
    store.updateAsync(uuid, getData()).then((): void => {
      // router.push(Tr.route({ name: RouteName.INDEX })).then(() => {
      toast.success(t('client.flash_messages.success.client_was_updated'))
      // })
    })
  }

  onMounted(() => {
    load()
  })

  return {
    // form,
    avatarPreview,
    inputs,
    update,
    uploadAvatar,
  }
}
