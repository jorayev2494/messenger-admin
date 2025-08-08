import type { PaginateInterface } from '@/utils/paginate/entities/contracts/PaginateInterface'
import type { AxiosResponse } from 'axios'
import { defineStore } from 'pinia'
import type { BrandInterface } from '../entities/contracts/BrandInterface'
import httpClient from '@/infrastructure/http'

export const useBrandStore = defineStore('brand', {
  state: () => ({}),
  getters: {},
  actions: {
    listAsync: async (): Promise<AxiosResponse<BrandInterface[]>> => {
      return await new Promise<AxiosResponse<BrandInterface[]>>((resolve, reject) => {
        return httpClient.get<BrandInterface[]>('/brands/list').then(resolve).catch(reject)
      })
    },

    loadBrandsAsync: async ({
      params,
    }: any): Promise<AxiosResponse<PaginateInterface<BrandInterface>>> => {
      return await new Promise<AxiosResponse<PaginateInterface<BrandInterface>>>(
        (resolve, reject) => {
          return httpClient
            .get<PaginateInterface<BrandInterface>>('/brands', { params })
            .then(resolve)
            .catch(reject)
        },
      )
    },

    createAsync: async (data: object): Promise<AxiosResponse> => {
      return await new Promise<AxiosResponse>((resolve, reject) => {
        return httpClient.post('/brands', data).then(resolve).catch(reject)
      })
    },

    showAsync: async (uuid: string): Promise<AxiosResponse> => {
      return await new Promise<AxiosResponse>((resolve, reject) => {
        return httpClient.get(`/brands/${uuid}`).then(resolve).catch(reject)
      })
    },

    updateAsync: async (uuid: string, data: FormData): Promise<AxiosResponse> => {
      return await new Promise<AxiosResponse>((resolve, reject) => {
        const headers = {
          'Content-Type': 'multipart/form-data',
        }

        data.append('_method', 'PUT')

        return httpClient.post(`/brands/${uuid}`, data, { headers }).then(resolve).catch(reject)
      })
    },

    deleteAsync: async (uuid: string): Promise<AxiosResponse> => {
      return await new Promise<AxiosResponse>((resolve, reject) => {
        return httpClient.delete(`/brands/${uuid}`).then(resolve).catch(reject)
      })
    },
  },
})
