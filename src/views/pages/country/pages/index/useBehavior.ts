import { usePaginator } from '@/utils/paginate/paginator'
import { useCountryStore } from '../../store/country'
import { useI18n } from 'vue-i18n'
import { useLoader } from '@/utils/loader/loader'
import { useACLProtection } from '@/services/acl/useACLProtection'
import { ResourceAction } from '../../acl/ACLEnum'
import type { CountryInterface } from '../../entities/contracts/CountryInterface'
import { onMounted, ref, type Ref } from 'vue'
import type { PaginateInterface } from '@/utils/paginate/entities/contracts/PaginateInterface'
import type { AxiosResponse } from 'axios'
import { toast } from 'vue3-toastify'

export default function () {
  const store = useCountryStore()
  const paginator = usePaginator()
  const { t } = useI18n()
  const loader = useLoader()
  const { checkPermissions, protectPermission } = useACLProtection()

  const columns: object[] = [
    { field: 'name', title: t('country.columns.name') },
    { field: 'flag', title: t('country.columns.flag') },
    { field: 'phone_code', title: t('country.columns.phone_code') },
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

  const countries: Ref<CountryInterface[]> = ref([])

  const countryMapper = (country: CountryInterface): CountryInterface => country

  const loadCountries = () => {
    loader.start()
    store
      .loadCountriesAsync({ ...paginator.toQueryParams() })
      .then((response: AxiosResponse<PaginateInterface<CountryInterface>>): void => {
        const { data } = response

        paginator.setMetaData(data)
        countries.value = data.data.map(countryMapper)
      })
      .finally(loader.stop)
  }

  const remove = (data: { value: CountryInterface }) => {
    protectPermission(ResourceAction.RESOURCE_DELETE).then(() => {
      const confirmed = confirm(`Do you want delete the country '${data.value.name}'`)

      if (confirmed) {
        store.deleteAsync(data.value.uuid).then(() => {
          toast.success(t('country.flash_messages.success.country_was_deleted'))
          reloadData()
        })
      }
    })
  }

  const reloadData = (): void => {
    countries.value = []
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
    countries,
    paginator,
    changeServer,
    remove,
  }
}
