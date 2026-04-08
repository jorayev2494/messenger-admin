import httpClient from '@/infrastructure/http'
import type { AxiosResponse } from 'axios'
import { defineStore } from 'pinia'
import type { BodyInterface } from '../entities/contracts/BodyInterface'

export const useBodyStore = defineStore('body', {
  state: (): object => ({}),
  getters: {},
  actions: {
    listAsync: async ({ params }: { params: object }): Promise<AxiosResponse<BodyInterface[]>> => {
      return await new Promise<AxiosResponse<BodyInterface[]>>((resolve, reject) => {
        return httpClient
          .get<BodyInterface[]>('/models/bodies/list', { params })
          .then(resolve)
          .catch(reject)
      })
    },
  },
})
