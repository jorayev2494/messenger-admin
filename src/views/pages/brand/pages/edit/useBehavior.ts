import { useRoute } from 'vue-router'
import { useBrandStore } from '../../store/brand'
import { useInput } from '../../useCases/useInput'
import { onMounted, reactive } from 'vue'
import { toast } from 'vue3-toastify'
import { useI18n } from 'vue-i18n'
import type { AxiosResponse } from 'axios'
import type { BrandInterface } from '../../entities/contracts/BrandInterface'
import useChangeImage from '@/views/components/changeImage/useChangeImage'

export default function () {
  const route = useRoute()
  const { t } = useI18n()
  const store = useBrandStore()
  const {
    preview: logoPreview,
    upload: uploadLogo,
    changePreview: changeLogoPreview,
    makeOriginalImageName: makeOriginalLogoName,
    isNotNull: isNotNullLogo,
  } = useChangeImage('avatar')

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

    fd.append('is_active', form.is_active ? 1 : 0)

    if (isNotNullLogo()) {
      fd.append('logo', form.logo, makeOriginalLogoName())
    }

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

  const selectedLogo = (event): void => {
    uploadLogo(event, (logo: File) => {
      formSetLogo(logo)
    })
  }

  const logoCropperHandler = (blob: Blob) => changeLogoPreview(blob, formSetLogo)

  const formSetLogo = (logo: File) => (form.logo = logo)

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
    selectedLogo,
    logoCropperHandler,
  }
}
