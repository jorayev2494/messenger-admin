import type { PaginateInterface } from '@/utils/paginate/entities/contracts/PaginateInterface'
import type { AxiosResponse } from 'axios'
import { defineStore } from 'pinia'
import type { ModelInterface } from '../entities/contracts/ModelInterface'
import httpClient from '@/infrastructure/http'

export const useModelStore = defineStore('model', {
  state: () => ({}),
  getters: {},
  actions: {
    listAsync: async ({ params }: { params: object }): Promise<AxiosResponse<ModelInterface[]>> => {
      return await new Promise<AxiosResponse<ModelInterface[]>>((resolve, reject) => {
        return httpClient
          .get<ModelInterface[]>('/models/list', { params })
          .then(resolve)
          .catch(reject)
      })
    },

    loadModelsAsync: async ({
      params,
    }: {
      params: object
    }): Promise<AxiosResponse<PaginateInterface<ModelInterface>>> => {
      return await new Promise<AxiosResponse<PaginateInterface<ModelInterface>>>(
        (resolve, reject) => {
          return httpClient
            .get<PaginateInterface<ModelInterface>>('/models', { params })
            .then(resolve)
            .catch(reject)
        },
      )
    },

    createAsync: async (data: object): Promise<AxiosResponse> => {
      return await new Promise<AxiosResponse>((resolve, reject) => {
        return httpClient.post('/models', data).then(resolve).catch(reject)
      })
    },

    showAsync: async (uuid: string): Promise<AxiosResponse> => {
      return await new Promise<AxiosResponse>((resolve, reject) => {
        return httpClient.get(`/models/${uuid}`).then(resolve).catch(reject)
      })
    },

    updateAsync: async (uuid: string, data: FormData): Promise<AxiosResponse> => {
      return await new Promise<AxiosResponse>((resolve, reject) => {
        const headers = {
          'Content-Type': 'multipart/form-data',
        }

        data.append('_method', 'PUT')

        return httpClient.post(`/models/${uuid}`, data, { headers }).then(resolve).catch(reject)
      })
    },

    deleteAsync: async (uuid: string): Promise<AxiosResponse> => {
      return await new Promise<AxiosResponse>((resolve, reject) => {
        return httpClient.delete(`/models/${uuid}`).then(resolve).catch(reject)
      })
    },
  },
})
