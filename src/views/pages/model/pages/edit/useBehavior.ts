import { useRoute } from 'vue-router'
import { useModelStore } from '../../store/model'
import { onMounted } from 'vue'
import { toast } from 'vue3-toastify'
import { useI18n } from 'vue-i18n'
import type { AxiosResponse } from 'axios'
import type { ModelInterface } from '../../entities/contracts/ModelInterface'
import useChangeImage from '@/views/components/changeImage/useChangeImage'
import { InputBuilder } from '../../useCases/InputBuilder'
import helpers from '@/utils/helpers/helpers'

export default function (): object {
  const route = useRoute()
  const { t } = useI18n()
  const store = useModelStore()
  const inputBuilder = new InputBuilder()
  inputBuilder.mounted()
  const {
    preview: imagePreview,
    upload: uploadImage,
    changePreview: changeImagePreview,
    makeOriginalImageName: makeOriginalImageName,
    isNotNull: isNotNullImage,
  } = useChangeImage('avatar')
  const { mimeTypeToExtension } = helpers()

  const { uuid } = <{ uuid: string }>route.params

  // const form = reactive({
  //   name: '',
  //   brandUuid: '',
  //   generation: '',
  //   bodyType: '',
  //   engineType: '',
  //   seatsCount: '',
  //   founded_year: null,
  //   image: '',
  //   is_active: false,
  // })

  const getData = (): FormData => {
    const fd = new FormData()

    const extension = mimeTypeToExtension(inputBuilder.form.image?.type)
    const imageName = `image.${extension}`

    fd.append('brand_uuid', inputBuilder.form.brand_uuid)
    fd.append('name', inputBuilder.form.name)
    fd.append('generation', inputBuilder.form.generation)
    fd.append('body_type', inputBuilder.form.body_type)
    fd.append('engine_type', inputBuilder.form.engine_type)
    fd.append('seats_count', inputBuilder.form.seats_count)
    fd.append('founded_year', inputBuilder.form.founded_year)
    fd.append('is_active', inputBuilder.form.is_active ? 1 : 0)

    if (isNotNullImage()) {
      fd.append('image', inputBuilder.form.image, makeOriginalImageName())
    }

    return fd
  }

  // const initForm = (model: ModelInterface): void => {
  //   imagePreview.value = model.image !== null ? model.image?.url : imagePreview.value
  //   form.brandUuid = model.brand_uuid
  //   form.name = model.name
  //   form.generation = model.generation
  //   form.body_type = model.body_type
  //   form.engine_type = model.engine_type
  //   form.seats_count = model.seats_count
  //   form.founded_year = model.founded_year
  //   form.image = ''
  //   form.is_active = model.is_active
  // }

  const load = () => {
    store.showAsync(uuid).then((response: AxiosResponse<ModelInterface>): void => {
      const { data } = response
      imagePreview.value = data.image !== null ? data.image?.url : imagePreview.value
      inputBuilder.initForm(data)
    })
  }

  const selectedImage = (event): void => {
    uploadImage(event, (image: File) => {
      formSetImage(image)
    })
  }

  const imageCropperHandler = (blob: Blob) => changeImagePreview(blob, formSetImage)

  const formSetImage = (image: File) => (inputBuilder.form.image = image)

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
    imagePreview,
    inputBuilder,
    update,
    selectedImage,
    imageCropperHandler,
  }
}
