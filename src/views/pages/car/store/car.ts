import { defineStore } from 'pinia'
import type CarInterface from '../entities/contracts/CarInterface'
import type { PaginateInterface } from '@/utils/paginate/entities/contracts/PaginateInterface'
import type { AxiosResponse } from 'axios'
import httpClient from '@/infrastructure/http'

export const useCarStore = defineStore('car', {
  state: () => ({}),
  getters: {},
  actions: {
    indexAsync: async ({
      params,
    }: any): Promise<AxiosResponse<PaginateInterface<CarInterface>>> => {
      return await new Promise<AxiosResponse<PaginateInterface<CarInterface>>>(
        (resolve, reject) => {
          return httpClient
            .get<PaginateInterface<CarInterface>>('/cars', { params })
            .then(resolve)
            .catch(reject)
        },
      )
    },

    createAsync: async (data: object): Promise<AxiosResponse> => {
      return await new Promise<AxiosResponse>((resolve, reject) => {
        return httpClient.post('/cars', data).then(resolve).catch(reject)
      })
    },

    showAsync: async (uuid: string): Promise<AxiosResponse> => {
      return await new Promise<AxiosResponse>((resolve, reject) => {
        return httpClient.get(`/cars/${uuid}`).then(resolve).catch(reject)
      })
    },

    updateAsync: async (uuid: string, data: object): Promise<AxiosResponse> => {
      return await new Promise<AxiosResponse>((resolve, reject) => {
        // const headers = {
        //   'Content-Type': 'multipart/form-data',
        // }

        // data.append('_method', 'PUT')

        return httpClient
          .put(`/cars/${uuid}`, data /** , { headers } */)
          .then(resolve)
          .catch(reject)
      })
    },

    deleteAsync: async (uuid: string): Promise<AxiosResponse> => {
      return await new Promise<AxiosResponse>((resolve, reject) => {
        return httpClient.delete(`/cars/${uuid}`).then(resolve).catch(reject)
      })
    },
  },
})
