import { useRouter } from 'vue-router'
import { useBrandStore } from '../../store/brand'
import { useInput } from '../../useCases/useInput'
import Tr from '@/infrastructure/translations/translation'
import { reactive, type Reactive } from 'vue'
import { RouteName } from '../../routes/RouteName'
import { toast } from 'vue3-toastify'
import { useI18n } from 'vue-i18n'
import type { InputAndEditorInterface } from '@/views/components/InputsAndEditors/entities/contracts/InputAndEditorInterface'
import type { AxiosResponse } from 'axios'
import type { BrandInterface } from '../../entities/contracts/BrandInterface'

export default function () {
  const router = useRouter()
  const { t } = useI18n()
  const store = useBrandStore()

  const form = reactive({})

  const inputs = useInput().map((input: InputAndEditorInterface): InputAndEditorInterface => {
    if (input.name === 'gender') {
      input.hide = true
    }

    return input
  })

  const getData = () => form

  const create = (): void => {
    store.createAsync(getData()).then(({ data }: AxiosResponse<BrandInterface>): void => {
      router.push(Tr.route({ name: RouteName.EDIT, params: { uuid: data.uuid } })).then(() => {
        toast.success(t('brand.flash_messages.success.brand_was_created'))
      })
    })
  }

  return {
    form,
    inputs,
    create,
  }
}
