import { onMounted, ref, type Ref } from 'vue'
import { useManagerStore } from '../../store/manager'
import { usePaginator } from '@/utils/paginate/paginator'
import { useI18n } from 'vue-i18n'
import { useLoader } from '@/utils/loader/loader'
import { toast } from 'vue3-toastify'
import type { ManagerInterface } from './Entities/Contracts/ManagerInterface'
import type { AxiosResponse } from 'axios'
import type { PaginateInterface } from '@/utils/paginate/entities/contracts/PaginateInterface'
import { ResourceAction } from '../../acl/ACLEnum'
import { useACLProtection } from '@/services/acl/useACLProtection'

export default function () {
  const store = useManagerStore()
  const paginator = usePaginator<ManagerInterface>()
  const { t } = useI18n()
  const loader = useLoader()
  const { checkPermissions, protectPermission } = useACLProtection()

  const columns: object[] = [
    { field: 'email', title: t('manager.columns.email') },
    { field: 'first_name', title: t('manager.columns.first_name') },
    { field: 'last_name', title: t('manager.columns.last_name') },
    {
      field: 'actions',
      title: t('system.actions'),
      hide: !checkPermissions([
        ResourceAction.RESOURCE_SHOW,
        ResourceAction.RESOURCE_UPDATE,
        ResourceAction.RESOURCE_DELETE,
      ]),
      sort: false,
      headerClass: 'float-end',
      cellClass: 'float-end',
    },
  ]

  const managers: Ref<ManagerInterface[]> = ref([])

  const managerMapper = (manager: ManagerInterface): ManagerInterface => manager

  const loadManagers = () => {
    loader.start()
    store
      .loadManagersAsync({ params: { ...paginator.toQueryParams() } })
      .then((response: AxiosResponse<PaginateInterface<ManagerInterface>>): void => {
        const { data } = response

        paginator.setMetaData(data)
        managers.value = data.data.map(managerMapper)
      })
      .finally(loader.stop)
  }

  const reloadData = (): void => {
    managers.value = []
    loadManagers()
  }

  const remove = (data: { value: ManagerInterface }) => {
    protectPermission(ResourceAction.RESOURCE_DELETE).then(() => {
      const confirmed = confirm(
        `Do you want delete the manager '${data.value.first_name} ${data.value.last_name}'`,
      )

      if (confirmed) {
        store.deleteAsync(data.value.uuid).then(() => {
          toast.success(t('manager.flash_messages.success.manager_was_deleted'))
          reloadData()
        })
      }
    })
  }

  const changeServer = (data: any) => {
    paginator.serverPaginate(data)

    reloadData()
  }

  onMounted((): void => {
    reloadData()
  })

  return {
    loader,
    columns,
    managers,
    paginator,
    changeServer,
    remove,
  }
}
