import { defineStore } from 'pinia'
import type TypeInterface from '../entities/contracts/TypeInterface'
import type { AxiosResponse } from 'axios'
import httpClient from '@/infrastructure/http'

export const usePlaceTypeStore = defineStore('place_type', {
  state: () => ({}),
  getters: {},
  actions: {
    listAsync: async (): Promise<AxiosResponse<TypeInterface[]>> => {
      return await new Promise<AxiosResponse<TypeInterface[]>>((resolve, reject) => {
        return httpClient.get<TypeInterface[]>('/places/types/list').then(resolve).catch(reject)
      })
    },
  },
})
