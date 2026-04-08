import httpClient from '@/infrastructure/http'
import type { AxiosResponse } from 'axios'
import { defineStore } from 'pinia'
import type { EngineInterface } from '../entities/contracts/EngineInterface'

export const useEngineStore = defineStore('engine', {
  state: (): object => ({}),
  getters: {},
  actions: {
    listAsync: async ({
      params,
    }: {
      params: object
    }): Promise<AxiosResponse<EngineInterface[]>> => {
      return await new Promise<AxiosResponse<EngineInterface[]>>((resolve, reject) => {
        return httpClient
          .get<EngineInterface[]>('/models/engines/list', { params })
          .then(resolve)
          .catch(reject)
      })
    },
  },
})
