import type { AxiosResponse } from 'axios'
import { defineStore } from 'pinia'
import type { ProfileInterface } from '../entities/contracts/ProfileInterface'
import httpClient from '@/infrastructure/http'

export const useProfileStore = defineStore('profile', {
  state: () => ({}),
  getters: {},
  actions: {
    showAsync: async () => {
      return await new Promise<AxiosResponse<ProfileInterface>>((resolve, reject) => {
        return httpClient.get<ProfileInterface>('/profile').then(resolve).catch(reject)
      })
    },

    updateAsync: async (data: ProfileInterface) => {
      return await new Promise<AxiosResponse>((resolve, reject) => {
        return httpClient.put('/profile', data).then(resolve).catch(reject)
      })
    },
  },
})
