import { onMounted, reactive, type Reactive } from 'vue'
import { useProfileStore } from '../../store/profile'
import { useInput } from '../../useCases/useInput'
import type { ProfileInterface } from '../../entities/contracts/ProfileInterface'
import type { AxiosResponse } from 'axios'

export default function () {
  const store = useProfileStore()
  const inputs = useInput().map((input) => {
    input.readonly = true

    return input
  })

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

  onMounted((): void => {
    load()
  })

  return {
    form,
    inputs,
  }
}
