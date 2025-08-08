import httpClient from '@/infrastructure/http'
import type { PaginateInterface } from '@/utils/paginate/entities/contracts/PaginateInterface'
import type { AxiosResponse } from 'axios'
import { defineStore } from 'pinia'
import type { DriverInterface } from '../entities/contracts/DriverInterface'

export const useDriverStore = defineStore('driver', {
  state: () => ({}),
  getters: {},
  actions: {
    listAsync: async (): Promise<AxiosResponse<DriverInterface[]>> => {
      return await new Promise<AxiosResponse<DriverInterface[]>>((resolve, reject) => {
        return httpClient.get<DriverInterface[]>('/drivers/list').then(resolve).catch(reject)
      })
    },

    loadDriversAsync: async ({
      params,
    }: any): Promise<AxiosResponse<PaginateInterface<DriverInterface>>> => {
      return await new Promise<AxiosResponse<PaginateInterface<DriverInterface>>>(
        (resolve, reject) => {
          return httpClient
            .get<PaginateInterface<DriverInterface>>('/drivers', { params })
            .then(resolve)
            .catch(reject)
        },
      )
    },

    createAsync: async (data: object): Promise<AxiosResponse> => {
      return await new Promise<AxiosResponse<DriverInterface>>((resolve, reject) => {
        return httpClient.post('/drivers', data).then(resolve).catch(reject)
      })
    },

    showAsync: async (uuid: string): Promise<AxiosResponse> => {
      return await new Promise<AxiosResponse>((resolve, reject) => {
        return httpClient.get(`/drivers/${uuid}`).then(resolve).catch(reject)
      })
    },

    updateAsync: async (uuid: string, data: FormData): Promise<AxiosResponse> => {
      return await new Promise<AxiosResponse>((resolve, reject) => {
        const headers = {
          'Content-Type': 'multipart/form-data',
        }

        data.append('_method', 'PUT')

        return httpClient.post(`/drivers/${uuid}`, data, { headers }).then(resolve).catch(reject)
      })
    },

    deleteAsync: async (uuid: string): Promise<AxiosResponse> => {
      return await new Promise<AxiosResponse>((resolve, reject) => {
        return httpClient.delete(`/drivers/${uuid}`).then(resolve).catch(reject)
      })
    },
  },
})
