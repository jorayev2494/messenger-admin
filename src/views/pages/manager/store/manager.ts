import httpClient from '@/infrastructure/http'
import type { PaginateInterface } from '@/utils/paginate/entities/contracts/PaginateInterface'
import type { AxiosResponse } from 'axios'
import { defineStore } from 'pinia'
import type ManagerInterface from '../pages/index/Entities/Contracts/ManagerInterface'

export const useManagerStore = defineStore('manager', {
  state: () => ({}),
  getters: {},
  actions: {
    loadManagersAsync: async ({
      params,
    }: any): Promise<AxiosResponse<PaginateInterface<ManagerInterface>>> => {
      return await new Promise<AxiosResponse<PaginateInterface<ManagerInterface>>>(
        (resolve, reject) => {
          return httpClient
            .get<PaginateInterface<ManagerInterface>>('/managers', { params })
            .then(resolve)
            .catch(reject)
        },
      )
    },

    createAsync: async (data: object): Promise<AxiosResponse> => {
      return await new Promise<AxiosResponse>((resolve, reject) => {
        return httpClient.post('/managers', data).then(resolve).catch(reject)
      })
    },

    showAsync: async (uuid: string): Promise<AxiosResponse> => {
      return await new Promise<AxiosResponse>((resolve, reject) => {
        return httpClient.get(`/managers/${uuid}`).then(resolve).catch(reject)
      })
    },

    updateAsync: async (uuid: string, data: object): Promise<AxiosResponse> => {
      return await new Promise<AxiosResponse>((resolve, reject) => {
        return httpClient.put(`/managers/${uuid}`, data).then(resolve).catch(reject)
      })
    },

    deleteAsync: async (uuid: string): Promise<AxiosResponse> => {
      return await new Promise<AxiosResponse>((resolve, reject) => {
        return httpClient.delete(`/managers/${uuid}`).then(resolve).catch(reject)
      })
    },
  },
})
