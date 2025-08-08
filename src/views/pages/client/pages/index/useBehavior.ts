import { onMounted, ref, type Ref } from 'vue'
import { useClientStore } from '../../store/client'
import { usePaginator } from '@/utils/paginate/paginator'
import { useI18n } from 'vue-i18n'
import { useLoader } from '@/utils/loader/loader'
import { toast } from 'vue3-toastify'
import type { ClientInterface } from '../../entities/contracts/ClientInterface'
import type { AxiosResponse } from 'axios'
import type { PaginateInterface } from '@/utils/paginate/entities/contracts/PaginateInterface'
import { useACLProtection } from '@/services/acl/useACLProtection'
import { ResourceAction } from '../../acl/ACLEnum'
import useChangeImage from '@/views/components/changeImage/useChangeImage'

export default function () {
  const store = useClientStore()
  const paginator = usePaginator<ClientInterface>()
  const { t } = useI18n()
  const loader = useLoader()
  const { preview: avatarPreview } = useChangeImage()
  const { checkPermissions, protectPermission } = useACLProtection()

  const columns: object[] = [
    { field: 'info', title: t('client.columns.info') },
    // { field: 'email', title: t('client.columns.email') },
    // { field: 'first_name', title: t('client.columns.first_name') },
    // { field: 'last_name', title: t('client.columns.last_name') },
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

  const clients: Ref<ClientInterface[]> = ref([])

  const clientMapper = (client: ClientInterface): ClientInterface => {
    client.avatar = client.avatar !== null ? client.avatar?.url : avatarPreview.value

    return client
  }

  const loadClient = () => {
    loader.start()
    store
      .loadClientsAsync({ params: { ...paginator.toQueryParams() } })
      .then((response: AxiosResponse<PaginateInterface<ClientInterface>>): void => {
        const { data } = response

        paginator.setMetaData(data)
        clients.value = data.data.map(clientMapper)
      })
      .finally(loader.stop)
  }

  const reloadData = (): void => {
    clients.value = []
    loadClient()
  }

  const remove = (data: { value: ClientInterface }) => {
    protectPermission(ResourceAction.RESOURCE_DELETE).then(() => {
      const confirmed = confirm(
        `Do you want delete the client '${data.value.first_name} ${data.value.last_name}'`,
      )

      if (confirmed) {
        store.deleteAsync(data.value.uuid).then(() => {
          toast.success(t('client.flash_messages.success.client_was_deleted'))
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
    clients,
    paginator,
    changeServer,
    remove,
  }
}
