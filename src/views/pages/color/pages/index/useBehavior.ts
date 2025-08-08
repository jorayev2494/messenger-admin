import { usePaginator } from '@/utils/paginate/paginator'
import { useColorStore } from '../../store/color'
import { useI18n } from 'vue-i18n'
import { useLoader } from '@/utils/loader/loader'
import { useACLProtection } from '@/services/acl/useACLProtection'
import { ResourceAction } from '../../acl/ACLEnum'
import type { ColorInterface } from '../../entities/contracts/ColorInterface'
import { onMounted, ref, type Ref } from 'vue'
import type { PaginateInterface } from '@/utils/paginate/entities/contracts/PaginateInterface'
import type { AxiosResponse } from 'axios'
import { toast } from 'vue3-toastify'

export default function () {
  const store = useColorStore()
  const paginator = usePaginator()
  const { t } = useI18n()
  const loader = useLoader()
  const { checkPermissions, protectPermission } = useACLProtection()

  const columns: object[] = [
    { field: 'name', title: t('color.columns.name') },
    { field: 'hex', title: t('color.columns.hex') },
    { field: 'is_active', title: t('color.columns.is_active') },
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

  const colors: Ref<ColorInterface[]> = ref([])

  const countryMapper = (country: ColorInterface): ColorInterface => country

  const loadCountries = () => {
    loader.start()
    store
      .loadCountriesAsync({ ...paginator.toQueryParams() })
      .then((response: AxiosResponse<PaginateInterface<ColorInterface>>): void => {
        const { data } = response

        paginator.setMetaData(data)
        colors.value = data.data.map(countryMapper)
      })
      .finally(loader.stop)
  }

  const remove = (data: { value: ColorInterface }) => {
    protectPermission(ResourceAction.RESOURCE_DELETE).then(() => {
      const confirmed = confirm(`Do you want delete the color '${data.value.name}'`)

      if (confirmed) {
        store.deleteAsync(data.value.uuid).then(() => {
          toast.success(t('color.flash_messages.success.color_was_deleted'))
          reloadData()
        })
      }
    })
  }

  const reloadData = (): void => {
    colors.value = []
    loadCountries()
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
    colors,
    paginator,
    changeServer,
    remove,
  }
}
