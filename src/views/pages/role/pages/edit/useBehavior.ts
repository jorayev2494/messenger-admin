import { onMounted, reactive, ref, type Reactive } from 'vue'
import type { RoleInterface } from '../../entities/contracts/RoleInterface'
import { useRoleStorage } from '../../store/role'
import { toast } from 'vue3-toastify'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { RouteName } from '../../routes/RouteName'
import { useInput } from '../../useCases/useInputs'

export default function () {
  const store = useRoleStorage()
  const router = useRouter()
  const { t } = useI18n()
  const route = useRoute()

  const { uuid }: { uuid: string } = route.params

  const form: Reactive<RoleInterface> = reactive({
    uuid: '',
    value: '',
    description: '',
    is_super_admin: false,
  })

  const permissionIds = ref([])

  const inputs = useInput()

  const show = () => {
    store.showAsync(uuid).then((response) => {
      const { data } = response

      form.uuid = data.uuid
      form.value = data.value
      form.description = data.description
      form.is_super_admin = data.is_super_admin
      permissionIds.value = data.permissions?.map(({ id }) => id)
    })
  }

  const getFormData = () => ({
    updateData: <RoleInterface>form,
    setPermissionsData: <object>{ permission_ids: permissionIds.value },
  })

  const update = () => {
    const { updateData, setPermissionsData } = getFormData()

    Promise.all([
      store.updateAsync(uuid, updateData),
      store.setPermissionsAsync(uuid, setPermissionsData),
    ]).then(() => {
      router.push({ name: RouteName.INDEX }).then(() => {
        toast.success(t('role.flash_messages.success.role_was_updated'))
      })
    })
  }

  onMounted(() => {
    show()
  })

  return {
    form,
    inputs,
    permissionIds,
    update,
  }
}
