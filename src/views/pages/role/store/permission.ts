import httpClient from '@/infrastructure/http'
import type { AxiosResponse } from 'axios'
import { defineStore } from 'pinia'
import type { PermissionInterface } from '../entities/contracts/PermissionInterface'

export const usePermissionStore = defineStore('permission', {
  state: () => ({}),
  getters: {},
  actions: {
    loadPermissionsAsync: async () => {
      return await new Promise<AxiosResponse<PermissionInterface[]>>(
        (resolve, reject): Promise<AxiosResponse<PermissionInterface[]>> => {
          return httpClient
            .get<AxiosResponse<PermissionInterface[]>>('/roles/permissions')
            .then(resolve)
            .catch(reject)
        },
      )
    },
  },
})
