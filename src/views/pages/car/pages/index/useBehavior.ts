import { usePaginator } from '@/utils/paginate/paginator'
import { useCarStore } from '../../store/car'
import type CarInterface from '../../entities/contracts/CarInterface'
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
  const store = useCarStore()
  const paginator = usePaginator<CarInterface>()
  const { t } = useI18n()
  const loader = useLoader()
  const { preview: avatarPreview } = useChangeImage()
  const { checkPermissions, protectPermission } = useACLProtection()

  const columns: object[] = [
    { title: t('car.columns.brand'), field: 'brand.name' },
    { title: t('car.columns.model'), field: 'model.name' },
    { title: t('car.columns.color'), field: 'color.name' },
    { title: t('car.columns.vin'), field: 'vin' },
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

  const cars: Ref<CarInterface[]> = ref([])

  const carMapper = (car: CarInterface): CarInterface => {
    // car.avatar = car.avatar !== null ? car.avatar?.url : avatarPreview.value

    return car
  }

  const loadClient = () => {
    loader.start()
    store
      .indexAsync({ params: { ...paginator.toQueryParams() } })
      .then((response: AxiosResponse<PaginateInterface<CarInterface>>): void => {
        const { data } = response

        paginator.setMetaData(data)
        cars.value = data.data.map(carMapper)
      })
      .finally(loader.stop)
  }

  const reloadData = (): void => {
    cars.value = []
    loadClient()
  }

  const remove = (data: { value: CarInterface }) => {
    protectPermission(ResourceAction.RESOURCE_DELETE).then(() => {
      const confirmed = confirm(`Do you want delete the car '${data.value.vin}'`)

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
    cars,
    paginator,
    changeServer,
    remove,
  }
}
