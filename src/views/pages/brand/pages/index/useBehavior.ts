import { onMounted, ref, type Ref } from 'vue'
import { useBrandStore } from '../../store/brand'
import type { BrandInterface } from '../../entities/contracts/BrandInterface'
import { usePaginator } from '@/utils/paginate/paginator'
import { ResourceAction } from '../../acl/ACLEnum'
import { toast } from 'vue3-toastify'
import { useI18n } from 'vue-i18n'
import { useLoader } from '@/utils/loader/loader'
import useChangeImage from '@/views/components/changeImage/useChangeImage'
import { useACLProtection } from '@/services/acl/useACLProtection'
import type { AxiosResponse } from 'axios'
import type { PaginateInterface } from '@/utils/paginate/entities/contracts/PaginateInterface'

export default function () {
  const store = useBrandStore()
  const paginator = usePaginator()
  const { t } = useI18n()
  const loader = useLoader()
  const { preview: avatarPreview } = useChangeImage('avatar')
  const { checkPermissions, protectPermission } = useACLProtection()

  const columns: object[] = [
    { field: 'logo', title: t('brand.columns.logo') },
    { field: 'slug', title: t('brand.columns.slug') },
    { field: 'name', title: t('brand.columns.name') },
    { field: 'founded_year', title: t('brand.columns.founded_year') },
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

  const brands: Ref<BrandInterface[]> = ref([])

  const brandMapper = (brand: BrandInterface): BrandInterface => {
    brand.logo = brand.logo !== null ? brand.logo?.url : avatarPreview.value

    return brand
  }

  const loadBrands = () => {
    loader.start()
    store
      .loadBrandsAsync({ ...paginator.toQueryParams() })
      .then((response: AxiosResponse<PaginateInterface<BrandInterface>>): void => {
        const { data } = response

        paginator.setMetaData(data)
        brands.value = data.data.map(brandMapper)
      })
      .finally(loader.stop)
  }

  const remove = (data: { value: BrandInterface }) => {
    protectPermission(ResourceAction.RESOURCE_DELETE).then(() => {
      const confirmed = confirm(`Do you want delete the brand '${data.value.name}'`)

      if (confirmed) {
        store.deleteAsync(data.value.uuid).then(() => {
          toast.success(t('brand.flash_messages.success.brand_was_deleted'))
          reloadData()
        })
      }
    })
  }

  const reloadData = (): void => {
    brands.value = []
    loadBrands()
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
    brands,
    paginator,
    changeServer,
    remove,
  }
}
