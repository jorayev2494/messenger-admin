import type { PaginateInterface } from '@/utils/paginate/entities/contracts/PaginateInterface'
import type { AxiosResponse } from 'axios'
import { defineStore } from 'pinia'
import type { CountryInterface } from '../entities/contracts/CountryInterface'
import httpClient from '@/infrastructure/http'

export const useCountryStore = defineStore('country', {
  state: () => ({}),
  getters: {},
  actions: {
    listAsync: async (): Promise<AxiosResponse<CountryInterface[]>> => {
      return await new Promise<AxiosResponse<CountryInterface[]>>((resolve, reject) => {
        return httpClient.get<CountryInterface[]>('/countries/list').then(resolve).catch(reject)
      })
    },

    loadCountriesAsync: async ({
      params,
    }: any): Promise<AxiosResponse<PaginateInterface<CountryInterface>>> => {
      return await new Promise<AxiosResponse<PaginateInterface<CountryInterface>>>(
        (resolve, reject) => {
          return httpClient
            .get<PaginateInterface<CountryInterface>>('/countries', { params })
            .then(resolve)
            .catch(reject)
        },
      )
    },

    createAsync: async (data: object): Promise<AxiosResponse> => {
      return await new Promise<AxiosResponse>((resolve, reject) => {
        return httpClient.post('/countries', data).then(resolve).catch(reject)
      })
    },

    showAsync: async (uuid: string): Promise<AxiosResponse> => {
      return await new Promise<AxiosResponse>((resolve, reject) => {
        return httpClient.get(`/countries/${uuid}`).then(resolve).catch(reject)
      })
    },

    updateAsync: async (uuid: string, data: object): Promise<AxiosResponse> => {
      return await new Promise<AxiosResponse>((resolve, reject) => {
        return httpClient.put(`/countries/${uuid}`, data).then(resolve).catch(reject)
      })
    },

    deleteAsync: async (uuid: string): Promise<AxiosResponse> => {
      return await new Promise<AxiosResponse>((resolve, reject) => {
        return httpClient.delete(`/countries/${uuid}`).then(resolve).catch(reject)
      })
    },
  },
})
