// import httpClient from "@/services/http";
import httpClient from '@/infrastructure/http'
import type { AxiosResponse } from 'axios'
import { defineStore } from 'pinia'

const WS_ACCESS_TOKEN_KEY = 'ws_access_token'

const loadAccessToken = (): string | null => window.localStorage.getItem(WS_ACCESS_TOKEN_KEY)

interface StateInterface {
  accessToken: string | null
}

export const useCentrifugeStore = defineStore('centrifuge', {
  state: (): StateInterface => ({
    accessToken: null,
  }),
  getters: {
    getAccessToken: (state): string | null => {
      return (state.accessToken ??= loadAccessToken())
    },
  },
  actions: {
    setAccessToken: (state: StateInterface, accessToken: string) => {
      localStorage.setItem(WS_ACCESS_TOKEN_KEY, (state.accessToken = accessToken))
    },
    async loadAccessTokenAsync(): Promise<AxiosResponse> {
      return await new Promise<AxiosResponse>((resolve, reject) => {
        return httpClient
          .get('/ws/generate-token')
          .then((response) => {
            const {
              data: { token },
            } = response
            this.setAccessToken(this.$state, token)

            return resolve(response)
          })
          .catch((error) => reject(error))
      })
    },
  },
})
