import { usePaginator } from '@/utils/paginate/paginator'
import { usePlaceStore } from '../../store/place'
import type PlaceInterface from '../../entities/contracts/PlaceInterface'
import { useI18n } from 'vue-i18n'
import { useLoader } from '@/utils/loader/loader'
import useChangeImage from '@/views/components/changeImage/useChangeImage'
import { useACLProtection } from '@/services/acl/useACLProtection'
import { ResourceAction } from '../../acl/ACLEnum'
import { onMounted, ref, type Ref } from 'vue'
import type { AxiosResponse } from 'axios'
import type { PaginateInterface } from '@/utils/paginate/entities/contracts/PaginateInterface'
import { toast } from 'vue3-toastify'

export default function () {
  const store = usePlaceStore()
  const paginator = usePaginator<PlaceInterface>()
  const { t } = useI18n()
  const loader = useLoader()
  const { preview: avatarPreview } = useChangeImage()
  const { checkPermissions, protectPermission } = useACLProtection()

  const columns: object[] = [
    { title: t('place.columns.name'), field: 'name' },
    { title: t('place.columns.type'), field: 'type' },
    { title: t('system.is_active'), field: 'is_active' },
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

  const items: Ref<PlaceInterface[]> = ref([])

  const carMapper = (car: PlaceInterface): PlaceInterface => {
    // car.avatar = car.avatar !== null ? car.avatar?.url : avatarPreview.value

    return car
  }

  const loadClient = () => {
    loader.start()
    store
      .indexAsync({ params: { ...paginator.toQueryParams() } })
      .then((response: AxiosResponse<PaginateInterface<PlaceInterface>>): void => {
        const { data } = response

        paginator.setMetaData(data)
        items.value = data.data.map(carMapper)
      })
      .finally(loader.stop)
  }

  const reloadData = (): void => {
    items.value = []
    loadClient()
  }

  const remove = (data: { value: PlaceInterface }) => {
    protectPermission(ResourceAction.RESOURCE_DELETE).then(() => {
      const confirmed = confirm(`Do you want delete the car '${data.value.name}'`)

      if (confirmed) {
        store.deleteAsync(data.value.uuid).then(() => {
          toast.success(t('car.flash_messages.success.car_was_deleted'))
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
    items,
    paginator,
    changeServer,
    remove,
  }
}
