import { useRoute, useRouter } from 'vue-router'
import { useBrandStore } from '../../store/brand'
import { useInput } from '../../useCases/useInput'
import Tr from '@/infrastructure/translations/translation'
import { onMounted, reactive } from 'vue'
import { RouteName } from '../../routes/RouteName'
import { toast } from 'vue3-toastify'
import { useI18n } from 'vue-i18n'
import type { AxiosResponse } from 'axios'
import type { BrandInterface } from '../../entities/contracts/BrandInterface'
import type { OptionInterface } from '@/views/components/InputsAndEditors/entities/contracts/OptionInterface'
import useChangeImage from '@/views/components/changeImage/useChangeImage'

export default function () {
  const router = useRouter()
  const route = useRoute()
  const { t } = useI18n()
  const store = useBrandStore()
  const { preview: logoPreview, upload: uploadAvatar } = useChangeImage('avatar')

  const { uuid } = <{ uuid: string }>route.params

  const form = reactive({
    name: '',
    founded_year: null,
    logo: '',
    is_active: false,
  })

  const inputs = useInput()

  const getData = (): FormData => {
    const fd = new FormData()

    fd.append('name', form.name)
    fd.append('founded_year', form.founded_year)
    fd.append('logo', form.logo)
    fd.append('is_active', form.is_active ? 1 : 0)

    return fd
  }

  const initForm = (brand: BrandInterface): void => {
    logoPreview.value = brand.logo !== null ? brand.logo?.url : logoPreview.value
    form.name = brand.name
    form.founded_year = brand.founded_year
    form.logo = ''
    form.is_active = brand.is_active
  }

  const load = () => {
    store.showAsync(uuid).then((response: AxiosResponse<BrandInterface>): void => {
      initForm(response.data)
    })
  }

  const update = (): void => {
    store.updateAsync(uuid, getData()).then((): void => {
      // router.push(Tr.route({ name: RouteName.INDEX })).then(() => {
      toast.success(t('brand.flash_messages.success.brand_was_updated'))
      // })
    })
  }

  onMounted(() => {
    load()
  })

  return {
    form,
    logoPreview,
    inputs,
    update,
    uploadAvatar,
  }
}
