import { useRouter } from 'vue-router'
import { useModelStore } from '../../store/model'
import { useBrandStore } from '../../../brand/store/brand'
import Tr from '@/infrastructure/translations/translation'
import { reactive } from 'vue'
import { RouteName } from '../../routes/RouteName'
import { toast } from 'vue3-toastify'
import { useI18n } from 'vue-i18n'
import type { AxiosResponse } from 'axios'
import type { ModelInterface } from '../../entities/contracts/ModelInterface'
import { InputBuilder } from '../../useCases/InputBuilder'
import type { InputAndEditorInterface } from '@/views/components/InputsAndEditors/entities/contracts/InputAndEditorInterface'

export default function () {
  const router = useRouter()
  const { t } = useI18n()
  const store = useModelStore()
  const brandStore = useBrandStore()
  const inputBuilder = new InputBuilder(brandStore)
    .map((input: InputAndEditorInterface): InputAndEditorInterface => {
      input.hide = !input.required

      return input
    })
    .build()

  const form = reactive({})

  const getData = (): object => form

  const create = (): void => {
    store.createAsync(getData()).then(({ data }: AxiosResponse<ModelInterface>): void => {
      router.push(Tr.route({ name: RouteName.EDIT, params: { uuid: data.uuid } })).then(() => {
        toast.success(t('model.flash_messages.success.model_was_created'))
      })
    })
  }

  return {
    form,
    inputBuilder,
    create,
  }
}
