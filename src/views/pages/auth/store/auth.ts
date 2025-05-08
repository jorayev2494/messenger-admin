import { defineStore } from 'pinia'
import jwtDefaultConfig from '@/services/auth/jwt/jwtDefaultConfig'
import type { LoginResponseInterface } from '../Entities/Contracts/Responses/LoginResponseInterface'
import type { PermissionInterface } from '../Entities/Contracts/PermissionInterface'
import type { RoleInterface } from '../Entities/Contracts/RoleInterface'

interface StateInterface {
  accessToken: string | null
  refreshToken: string | null
  authData: object | null
  role: RoleInterface | null
  permissions: PermissionInterface[]
}

export const useAuthStore = defineStore('auth', {
  state: (): StateInterface => ({
    accessToken: null,
    refreshToken: null,
    authData: null,
    role: null,
    permissions: [],
  }),
  getters: {
    getAccessToken(): string | null {
      return (this.accessToken ??= localStorage.getItem(jwtDefaultConfig.storageAccessTokenKeyName))
    },
    getRefreshToken(): string | null {
      return (this.refreshToken ??= localStorage.getItem(
        jwtDefaultConfig.storageRefreshTokenKeyName,
      ))
    },
    getAuthData(): object | null {
      if (this.authData === null) {
        const userData: string | null = localStorage.getItem(
          jwtDefaultConfig.storageAuthDataKeyName,
        )

        this.authData = userData !== null ? JSON.parse(userData) : null
      }

      return this.authData
    },
    getRole(): RoleInterface | null {
      if (this.role === null) {
        const role: string | null = localStorage.getItem(jwtDefaultConfig.storageRoleKeyName)

        this.role = role !== null ? JSON.parse(role) : role
      }

      return this.role
    },
    getPermissions(): PermissionInterface[] {
      if (!this.permissions.length) {
        const permissions: string | null = localStorage.getItem(
          jwtDefaultConfig.storagePermissionKeyName,
        )

        return (this.permissions = permissions !== null ? JSON.parse(permissions) : null)
      }

      return this.permissions
    },
    // isAuthenticated: () => typeof(loadAccessToken()) === 'string',
  },
  actions: {
    setAccessToken(keyName: string, accessToken: string): void {
      localStorage.setItem(keyName, (this.accessToken = accessToken))
    },
    setRefreshToken(keyName: string, refreshToken: string): void {
      localStorage.setItem(keyName, (this.refreshToken = refreshToken))
    },
    setData(keyName: string, payload: LoginResponseInterface): void {
      localStorage.setItem(keyName, JSON.stringify(payload))
    },
    setAuthData(keyName: string, payload: object): void {
      localStorage.setItem(keyName, JSON.stringify((this.authData = payload)))
    },
    setRole(keyName: string, payload: RoleInterface): void {
      localStorage.setItem(keyName, JSON.stringify((this.role = payload)))
    },
    setPermissions(keyName: string, payload: PermissionInterface[]): void {
      localStorage.setItem(keyName, JSON.stringify((this.permissions = payload)))
    },
  },
})
