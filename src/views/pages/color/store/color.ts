import type { PaginateInterface } from '@/utils/paginate/entities/contracts/PaginateInterface'
import type { AxiosResponse } from 'axios'
import { defineStore } from 'pinia'
import type { ColorInterface } from '../entities/contracts/ColorInterface'
import httpClient from '@/infrastructure/http'

export const useColorStore = defineStore('color', {
  state: () => ({}),
  getters: {},
  actions: {
    listAsync: async (): Promise<AxiosResponse<ColorInterface[]>> => {
      return await new Promise<AxiosResponse<ColorInterface[]>>((resolve, reject) => {
        return httpClient.get<ColorInterface[]>('/colors/list').then(resolve).catch(reject)
      })
    },

    loadCountriesAsync: async ({
      params,
    }: any): Promise<AxiosResponse<PaginateInterface<ColorInterface>>> => {
      return await new Promise<AxiosResponse<PaginateInterface<ColorInterface>>>(
        (resolve, reject) => {
          return httpClient
            .get<PaginateInterface<ColorInterface>>('/colors', { params })
            .then(resolve)
            .catch(reject)
        },
      )
    },

    createAsync: async (data: object): Promise<AxiosResponse> => {
      return await new Promise<AxiosResponse>((resolve, reject) => {
        return httpClient.post('/colors', data).then(resolve).catch(reject)
      })
    },

    showAsync: async (uuid: string): Promise<AxiosResponse> => {
      return await new Promise<AxiosResponse>((resolve, reject) => {
        return httpClient.get(`/colors/${uuid}`).then(resolve).catch(reject)
      })
    },

    updateAsync: async (uuid: string, data: object): Promise<AxiosResponse> => {
      return await new Promise<AxiosResponse>((resolve, reject) => {
        return httpClient.put(`/colors/${uuid}`, data).then(resolve).catch(reject)
      })
    },

    deleteAsync: async (uuid: string): Promise<AxiosResponse> => {
      return await new Promise<AxiosResponse>((resolve, reject) => {
        return httpClient.delete(`/colors/${uuid}`).then(resolve).catch(reject)
      })
    },
  },
})
