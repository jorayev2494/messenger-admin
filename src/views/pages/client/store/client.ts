import httpClient from '@/infrastructure/http'
import type { PaginateInterface } from '@/utils/paginate/entities/contracts/PaginateInterface'
import type { AxiosResponse } from 'axios'
import { defineStore } from 'pinia'
import type { ClientInterface } from '../entities/contracts/ClientInterface'

export const useClientStore = defineStore('client', {
  state: () => ({}),
  getters: {},
  actions: {
    listAsync: async (): Promise<AxiosResponse<ClientInterface[]>> => {
      return await new Promise<AxiosResponse<ClientInterface[]>>((resolve, reject) => {
        return httpClient.get<ClientInterface[]>('/clients/list').then(resolve).catch(reject)
      })
    },

    loadClientsAsync: async ({
      params,
    }: any): Promise<AxiosResponse<PaginateInterface<ClientInterface>>> => {
      return await new Promise<AxiosResponse<PaginateInterface<ClientInterface>>>(
        (resolve, reject) => {
          return httpClient
            .get<PaginateInterface<ClientInterface>>('/clients', { params })
            .then(resolve)
            .catch(reject)
        },
      )
    },

    createAsync: async (data: object): Promise<AxiosResponse> => {
      return await new Promise<AxiosResponse>((resolve, reject) => {
        return httpClient.post('/clients', data).then(resolve).catch(reject)
      })
    },

    showAsync: async (uuid: string): Promise<AxiosResponse> => {
      return await new Promise<AxiosResponse>((resolve, reject) => {
        return httpClient.get(`/clients/${uuid}`).then(resolve).catch(reject)
      })
    },

    updateAsync: async (uuid: string, data: FormData): Promise<AxiosResponse> => {
      return await new Promise<AxiosResponse>((resolve, reject) => {
        const headers = {
          'Content-Type': 'multipart/form-data',
        }

        data.append('_method', 'PUT')

        return httpClient.post(`/clients/${uuid}`, data, { headers }).then(resolve).catch(reject)
      })
    },

    deleteAsync: async (uuid: string): Promise<AxiosResponse> => {
      return await new Promise<AxiosResponse>((resolve, reject) => {
        return httpClient.delete(`/clients/${uuid}`).then(resolve).catch(reject)
      })
    },
  },
})
