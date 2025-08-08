import { useRoute } from 'vue-router'
import { useClientStore } from '../../store/client'
import { useInput } from '../../useCases/useInput'
import { onMounted, reactive } from 'vue'
import type { AxiosResponse } from 'axios'
import type { ClientInterface } from '../../entities/contracts/ClientInterface'
import type { InputAndEditorInterface } from '@/views/components/InputsAndEditors/entities/contracts/InputAndEditorInterface'
import useChangeImage from '@/views/components/changeImage/useChangeImage'
import type { OptionInterface } from '@/views/components/InputsAndEditors/entities/contracts/OptionInterface'

export default function () {
  const route = useRoute()
  const store = useClientStore()
  const { preview: avatarPreview } = useChangeImage('avatar')

  const { uuid } = route.params

  const form = reactive({
    email: '',
    first_name: '',
    last_name: '',
    avatar: '',
    gender: '',
  })

  const genderOptions: Array<OptionInterface> = [
    {
      label: 'system.gender.items.male',
      value: 'male',
    },
    {
      label: 'system.gender.items.female',
      value: 'female',
    },
  ]

  const inputs = useInput(genderOptions).map(
    (input: InputAndEditorInterface): InputAndEditorInterface => {
      input.required = false
      input.readonly = true

      return input
    },
  )

  const load = () => {
    store.showAsync(uuid).then((response: AxiosResponse<ClientInterface>): void => {
      avatarPreview.value =
        response.data.avatar !== null ? response.data.avatar?.url : avatarPreview.value
      form.email = response.data.email
      form.first_name = response.data.first_name
      form.last_name = response.data.last_name
      form.avatar = ''
      form.gender = response.data.gender
    })
  }

  onMounted(() => {
    load()
  })

  return {
    form,
    avatarPreview,
    inputs,
  }
}
