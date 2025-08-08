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

    updateAsync: async (data: FormData) => {
      return await new Promise<AxiosResponse>((resolve, reject) => {
        const headers = {
          'Content-Type': 'multipart/form-data',
        }

        data.append('_method', 'PUT')

        return httpClient.post('/profile', data, { headers }).then(resolve).catch(reject)
      })
    },
  },
})
