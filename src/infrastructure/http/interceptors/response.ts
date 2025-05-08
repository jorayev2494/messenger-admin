import ServerValidate from '@/infrastructure/toast/template/ServerValidate.vue'
import ServerSymfonyValidate from '@/infrastructure/toast/template/ServerSymfonyValidate.vue'
import BadRequest from '@/infrastructure/toast/template/BadRequest.vue'
import { toast } from 'vue3-toastify'

const response = (response: object) => response

const responseError = (error: object) => {
  const accessToken = localStorage.getItem('access_token')
  const { config, response } = error

  if (response && response.status === 422) {
    toast.error(response?.data?.driver === 'symfony' ? ServerSymfonyValidate : ServerValidate, {
      autoClose: 5000,
      data: response.data,
      position: accessToken ? 'top-right' : 'top-center',
      toastStyle: {
        // maxWidth: '100%',
        width: '100%',
        fontSize: '14px',
      },
    })
  }

  if (response && [400, 403].includes(response.status)) {
    toast.error(BadRequest, {
      autoClose: 5000,
      data: response.data,
      position: accessToken ? 'top-right' : 'top-center',
    })
  }

  return Promise.reject(error)
}

export default {
  response,
  responseError,
}
