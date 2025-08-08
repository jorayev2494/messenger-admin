import { defineStore } from 'pinia'
import type PlaceInterface from '../entities/contracts/PlaceInterface'
import type { PaginateInterface } from '@/utils/paginate/entities/contracts/PaginateInterface'
import type { AxiosResponse } from 'axios'
import httpClient from '@/infrastructure/http'

export const usePlaceStore = defineStore('place', {
  state: () => ({}),
  getters: {},
  actions: {
    listAsync: async ({ params }: { params: object }): Promise<AxiosResponse<PlaceInterface[]>> => {
      return await new Promise<AxiosResponse<PlaceInterface[]>>((resolve, reject) => {
        return httpClient
          .get<PlaceInterface[]>('/places/list', { params })
          .then(resolve)
          .catch(reject)
      })
    },

    indexAsync: async ({
      params,
    }: any): Promise<AxiosResponse<PaginateInterface<PlaceInterface>>> => {
      return await new Promise<AxiosResponse<PaginateInterface<PlaceInterface>>>(
        (resolve, reject) => {
          return httpClient
            .get<PaginateInterface<PlaceInterface>>('/places', { params })
            .then(resolve)
            .catch(reject)
        },
      )
    },

    createAsync: async (data: object): Promise<AxiosResponse> => {
      return await new Promise<AxiosResponse>((resolve, reject) => {
        return httpClient.post('/places', data).then(resolve).catch(reject)
      })
    },

    showAsync: async (uuid: string): Promise<AxiosResponse> => {
      return await new Promise<AxiosResponse>((resolve, reject) => {
        return httpClient.get(`/places/${uuid}`).then(resolve).catch(reject)
      })
    },

    updateAsync: async (uuid: string, data: object): Promise<AxiosResponse> => {
      return await new Promise<AxiosResponse>((resolve, reject) => {
        return httpClient.put(`/places/${uuid}`, data).then(resolve).catch(reject)
      })
    },

    deleteAsync: async (uuid: string): Promise<AxiosResponse> => {
      return await new Promise<AxiosResponse>((resolve, reject) => {
        return httpClient.delete(`/places/${uuid}`).then(resolve).catch(reject)
      })
    },
  },
})
