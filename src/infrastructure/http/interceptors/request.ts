import { DeviceUUID } from 'device-uuid'
import Tr from '@/infrastructure/translations/translation'
import { useAuthStore } from '@/views/pages/auth/store/auth'
import type { AxiosError, AxiosRequestConfig } from 'axios'

const makeDeviceIdHash = () => {
  const deviceUUID = new DeviceUUID().parse()

  const info = [deviceUUID.language, deviceUUID.platform, deviceUUID.os, deviceUUID.cpuCores]

  return deviceUUID.hashMD5(info.join(':'))
}

const request = (config: AxiosRequestConfig) => {
  const authStore = useAuthStore()
  const accessToken: string | null = authStore.getAccessToken

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }

  // request.headers['X-Socket-Id'] = Echo.socketId()
  config.headers['X-Device-Id'] = makeDeviceIdHash()
  config.headers['Accept-Language'] = Tr.currentLocale

  return config
}

const requestError = (error: AxiosError) => {
  return Promise.reject(error)
}

export default {
  request,
  requestError,
}
