import { onMounted, ref, type Ref } from 'vue'
import { useDriverStore } from '../../store/driver'
import { usePaginator } from '@/utils/paginate/paginator'
import { useI18n } from 'vue-i18n'
import { useLoader } from '@/utils/loader/loader'
import { toast } from 'vue3-toastify'
import type { DriverInterface } from '../../entities/contracts/DriverInterface'
import type { AxiosResponse } from 'axios'
import type { PaginateInterface } from '@/utils/paginate/entities/contracts/PaginateInterface'
import { useACLProtection } from '@/services/acl/useACLProtection'
import { ResourceAction } from '../../acl/ACLEnum'
import useChangeImage from '@/views/components/changeImage/useChangeImage'

export default function () {
  const store = useDriverStore()
  const paginator = usePaginator<DriverInterface>()
  const { t } = useI18n()
  const loader = useLoader()
  const { preview: avatarPreview } = useChangeImage('avatar')
  const { checkPermissions, protectPermission } = useACLProtection()

  const columns: object[] = [
    { field: 'info', title: t('driver.columns.info') },
    // { field: 'email', title: t('driver.columns.email') },
    // { field: 'first_name', title: t('driver.columns.first_name') },
    // { field: 'last_name', title: t('driver.columns.last_name') },
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

  const drivers: Ref<DriverInterface[]> = ref([])

  const clientMapper = (manager: DriverInterface): DriverInterface => {
    manager.avatar = manager.avatar !== null ? manager.avatar?.url : avatarPreview.value

    return manager
  }

  const loadDriver = () => {
    loader.start()
    store
      .loadDriversAsync({ params: { ...paginator.toQueryParams() } })
      .then((response: AxiosResponse<PaginateInterface<DriverInterface>>): void => {
        const { data } = response

        paginator.setMetaData(data)
        drivers.value = data.data.map(clientMapper)
      })
      .finally(loader.stop)
  }

  const reloadData = (): void => {
    drivers.value = []
    loadDriver()
  }

  const remove = (data: { value: DriverInterface }) => {
    protectPermission(ResourceAction.RESOURCE_DELETE).then(() => {
      const confirmed = confirm(
        `Do you want delete the driver '${data.value.first_name} ${data.value.last_name}'`,
      )

      if (confirmed) {
        store.deleteAsync(data.value.uuid).then(() => {
          toast.success(t('driver.flash_messages.success.driver_was_deleted'))
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
    avatarPreview,
    columns,
    drivers,
    paginator,
    changeServer,
    remove,
  }
}
