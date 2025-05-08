import httpClient from '@/infrastructure/http'
import type { PaginateInterface } from '@/utils/paginate/entities/contracts/PaginateInterface'
import type { AxiosResponse } from 'axios'
import { defineStore } from 'pinia'
import type { RoleInterface } from '../entities/contracts/RoleInterface'

export const useRoleStorage = defineStore('role', {
  state: () => ({}),
  getters: {},
  actions: {
    loadRolesAsync: async ({
      params,
    }: {
      params: object
    }): Promise<AxiosResponse<PaginateInterface<RoleInterface>>> => {
      return await new Promise<AxiosResponse<PaginateInterface<RoleInterface>>>(
        (resolve, reject) => {
          return httpClient
            .get<PaginateInterface<RoleInterface>>('/roles', { params })
            .then(resolve)
            .catch(reject)
        },
      )
    },
    createAsync: async (data: RoleInterface): Promise<AxiosResponse> => {
      return await new Promise<AxiosResponse<{ uuid: string }>>((resolve, reject) => {
        return httpClient
          .post<AxiosResponse<{ uuid: string }>>('/roles', data)
          .then(resolve)
          .catch(reject)
      })
    },
    showAsync: async (uuid: string): Promise<AxiosResponse<RoleInterface>> => {
      return await new Promise<AxiosResponse<RoleInterface>>((resolve, reject) => {
        return httpClient
          .get<AxiosResponse<RoleInterface>>(`/roles/${uuid}`)
          .then(resolve)
          .catch(reject)
      })
    },
    updateAsync: async (uuid: string, data: RoleInterface): Promise<AxiosResponse> => {
      return await new Promise<AxiosResponse>((resolve, reject) => {
        return httpClient.put<AxiosResponse>(`/roles/${uuid}`, data).then(resolve).catch(reject)
      })
    },
    deleteAsync: async (uuid: string): Promise<AxiosResponse> => {
      return await new Promise<AxiosResponse<object>>((resolve, reject) => {
        return httpClient
          .delete<AxiosResponse<object>>(`/roles/${uuid}`)
          .then(resolve)
          .catch(reject)
      })
    },
    setPermissionsAsync: async (uuid: string, data: object): Promise<AxiosResponse> => {
      return await new Promise<AxiosResponse>((resolve, reject) => {
        return httpClient
          .post<AxiosResponse>(`/roles/${uuid}/permissions`, data)
          .then(resolve)
          .catch(reject)
      })
    },
  },
})
