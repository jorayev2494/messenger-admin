import { onMounted, reactive, type Reactive } from 'vue'
import type { RoleInterface } from '../../entities/contracts/RoleInterface'
import { useRoleStorage } from '../../store/role'
import { useRoute } from 'vue-router'
import { useInput } from '../../useCases/useInputs'

export default function () {
  const store = useRoleStorage()
  const route = useRoute()

  const { uuid }: { uuid: string } = route.params

  const form: Reactive<RoleInterface> = reactive({
    uuid: '',
    value: '',
    description: '',
    is_super_admin: false,
  })

  const inputs = useInput().map((input) => {
    input.readonly = true

    return input
  })

  const show = () => {
    store.showAsync(uuid).then((response) => {
      const { data } = response

      form.uuid = data.uuid
      form.value = data.value
      form.description = data.description
      form.is_super_admin = data.is_super_admin
    })
  }

  onMounted(() => {
    show()
  })

  return {
    form,
    inputs,
  }
}
