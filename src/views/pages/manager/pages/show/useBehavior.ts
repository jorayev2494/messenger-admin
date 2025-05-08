import { useRoute } from 'vue-router'
import { useManagerStore } from '../../store/manager'
import { useInput } from '../../useCases/useInput'
import { onMounted, reactive } from 'vue'
import type { AxiosResponse } from 'axios'
import type { ManagerInterface } from '../index/Entities/Contracts/ManagerInterface'
import type { InputAndEditorInterface } from '@/views/components/InputsAndEditors/entities/contracts/InputAndEditorInterface'

export default function () {
  const route = useRoute()
  const store = useManagerStore()

  const { uuid } = route.params

  const form = reactive({
    email: '',
    first_name: '',
    last_name: '',
  })

  const inputs = useInput().map((input: InputAndEditorInterface): InputAndEditorInterface => {
    input.required = false
    input.readonly = true

    return input
  })

  const load = () => {
    store.showAsync(uuid).then((response: AxiosResponse<ManagerInterface>): void => {
      form.email = response.data.email
      form.first_name = response.data.first_name
      form.last_name = response.data.last_name
    })
  }

  onMounted(() => {
    load()
  })

  return {
    form,
    inputs,
  }
}
