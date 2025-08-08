import { onMounted, ref, type Ref } from 'vue'
import { useModelStore } from '../../store/model'
import type { ModelInterface } from '../../entities/contracts/ModelInterface'
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
  const store = useModelStore()
  const paginator = usePaginator()
  const { t } = useI18n()
  const loader = useLoader()
  const { preview: imagePreview } = useChangeImage()
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

  const models: Ref<ModelInterface[]> = ref([])

  const brandMapper = (brand: ModelInterface): ModelInterface => {
    brand.image = brand.image !== null ? brand.image?.url : imagePreview.value

    return brand
  }

  const loadModels = () => {
    loader.start()
    store
      .loadModelsAsync({ ...paginator.toQueryParams() })
      .then((response: AxiosResponse<PaginateInterface<ModelInterface>>): void => {
        const { data } = response

        paginator.setMetaData(data)
        models.value = data.data.map(brandMapper)
      })
      .finally(loader.stop)
  }

  const remove = (data: { value: ModelInterface }) => {
    protectPermission(ResourceAction.RESOURCE_DELETE).then(() => {
      const confirmed = confirm(`Do you want delete the model '${data.value.name}'`)

      if (confirmed) {
        store.deleteAsync(data.value.uuid).then(() => {
          toast.success(t('model.flash_messages.success.model_was_deleted'))
          reloadData()
        })
      }
    })
  }

  const reloadData = (): void => {
    models.value = []
    loadModels()
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
    models,
    paginator,
    changeServer,
    remove,
  }
}
