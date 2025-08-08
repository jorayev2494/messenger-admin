import { useRoute, useRouter } from 'vue-router'
import { useModelStore } from '../../store/model'
import { onMounted, reactive } from 'vue'
import { toast } from 'vue3-toastify'
import { useI18n } from 'vue-i18n'
import type { AxiosResponse } from 'axios'
import type { ModelInterface } from '../../entities/contracts/ModelInterface'
import useChangeImage from '@/views/components/changeImage/useChangeImage'
import { InputBuilder } from '../../useCases/InputBuilder'

export default function () {
  const router = useRouter()
  const route = useRoute()
  const { t } = useI18n()
  const store = useModelStore()
  const inputBuilder = new InputBuilder(store).build()
  const { preview: imagePreview, upload: uploadImage } = useChangeImage('avatar')

  const { uuid } = <{ uuid: string }>route.params

  const form = reactive({
    name: '',
    brandUuid: '',
    generation: '',
    bodyType: '',
    engineType: '',
    seatsCount: '',
    founded_year: null,
    image: '',
    is_active: false,
  })

  const getData = (): FormData => {
    const fd = new FormData()

    fd.append('brand_uuid', form.brandUuid)
    fd.append('name', form.name)
    fd.append('generation', form.generation)
    fd.append('body_type', form.bodyType)
    fd.append('engine_type', form.engineType)
    fd.append('seats_count', form.seatsCount)
    fd.append('founded_year', form.founded_year)
    fd.append('image', form.image)
    fd.append('is_active', form.is_active ? 1 : 0)

    return fd
  }

  const initForm = (model: ModelInterface): void => {
    imagePreview.value = model.image !== null ? model.image?.url : imagePreview.value
    form.brandUuid = model.brand_uuid
    form.name = model.name
    form.generation = model.generation
    form.body_type = model.body_type
    form.engine_type = model.engine_type
    form.seats_count = model.seats_count
    form.founded_year = model.founded_year
    form.image = ''
    form.is_active = model.is_active
  }

  const load = () => {
    store.showAsync(uuid).then((response: AxiosResponse<ModelInterface>): void => {
      initForm(response.data)
    })
  }

  const update = (): void => {
    store.updateAsync(uuid, getData()).then((): void => {
      // router.push(Tr.route({ name: RouteName.INDEX })).then(() => {
      toast.success(t('model.flash_messages.success.model_was_updated'))
      // })
    })
  }

  onMounted(() => {
    load()
  })

  return {
    form,
    imagePreview,
    inputBuilder,
    update,
    uploadImage,
  }
}
