import { useRouter } from 'vue-router'
import { useClientStore } from '../../store/client'
import Tr from '@/infrastructure/translations/translation'
import { RouteName } from '../../routes/RouteName'
import { toast } from 'vue3-toastify'
import { useI18n } from 'vue-i18n'
import type { InputAndEditorInterface } from '@/views/components/InputsAndEditors/entities/contracts/InputAndEditorInterface'
import type { AxiosResponse } from 'axios'
import type { ClientInterface } from '../../entities/contracts/ClientInterface'
import { InputBuilder } from '../../useCases/InputBuilder'

export default function () {
  const router = useRouter()
  const { t } = useI18n()
  const store = useClientStore()

  const inputs = new InputBuilder().filter((input: InputAndEditorInterface): boolean => {
    return input.required
  })
  inputs.mounted()

  const getData = () => inputs.form

  const create = (): void => {
    store.createAsync(getData()).then(({ data }: AxiosResponse<ClientInterface>): void => {
      router.push(Tr.route({ name: RouteName.EDIT, params: { uuid: data.uuid } })).then(() => {
        toast.success(t('client.flash_messages.success.client_was_created'))
      })
    })
  }

  return {
    inputs,
    create,
  }
}
