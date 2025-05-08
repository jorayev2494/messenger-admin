import { onMounted, ref, type Ref } from 'vue'
import { useRoleStorage } from '../../store/role'
import type { RoleInterface } from '../../entities/contracts/RoleInterface'
import { usePaginator } from '@/utils/paginate/paginator'
import { useI18n } from 'vue-i18n'
import { toast } from 'vue3-toastify'
import { useLoader } from '@/utils/loader/loader'

export default function () {
  const store = useRoleStorage()
  const paginator = usePaginator()
  const { t } = useI18n()
  const loader = useLoader()

  const columns: object[] = [
    { field: 'value', title: t('role.columns.value') },
    { field: 'is_super_admin', title: t('role.columns.is_super_admin') },
    { field: 'description', title: t('role.columns.description') },
    {
      field: 'actions',
      title: t('system.actions'),
      sort: false,
      headerClass: 'float-end',
      cellClass: 'float-end',
    },
  ]

  const roles: Ref<RoleInterface[]> = ref([])

  const roleMapper = (role: RoleInterface): RoleInterface => role

  const loadRoles = () => {
    loader.start()
    store
      .loadRolesAsync({ params: { ...paginator.toQueryParams() } })
      .then((response) => {
        const { data } = response

        paginator.setMetaData(data)
        roles.value = data.data.map(roleMapper)
      })
      .finally(loader.stop)
  }

  const reloadData = (): void => {
    roles.value = []
    loadRoles()
  }

  const remove = (data: { value: RoleInterface }) => {
    const confirmed = confirm(`Do you want delete the manager '${data.value.value}'`)

    if (confirmed) {
      store.deleteAsync(data.value.uuid).then(() => {
        toast.success(t('role.flash_messages.success.role_was_deleted'))
        reloadData()
      })
    }
  }

  const changeServer = (data: any) => {
    paginator.serverPaginate(data)

    reloadData()
  }

  onMounted(() => {
    reloadData()
  })

  return {
    loader,
    columns,
    roles,
    paginator,
    changeServer,
    remove,
  }
}
