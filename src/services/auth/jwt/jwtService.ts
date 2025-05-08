import { useAuthStore } from '@/views/pages/auth/store/auth'
import useWS from '@/services/ws/useWS'
import jwtDefaultConfig from './jwtDefaultConfig'
import type { LoginInterface } from '@/views/pages/auth/Entities/Contracts/Forms/LoginInterface'
import type { ForgotPasswordInterface } from '@/views/pages/auth/Entities/Contracts/Forms/ForgotPasswordInterface'
import type { RestorePasswordInterface } from '@/views/pages/auth/Entities/Contracts/Forms/RestorePasswordInterface'
import { HttpStatusCode, type AxiosInstance } from 'axios'
import type { WSServiceInterface } from '@/services/ws/contracts/WSServiceInterface'
import { useProfileStore } from '@/views/pages/profile/store/profile'
import { getActivePinia } from 'pinia'
import { jwtDecode, type JwtPayload } from 'jwt-decode'
import type { RoleInterface } from '@/views/pages/auth/Entities/Contracts/RoleInterface'
// import router from '@/services/router/index.js';
// import store from '@/services/store/index';
// import ToastificationContent from '@core/components/toastification/ToastificationContent.vue';
// import ServerValidateToastificationContent from '@core/components/toastification/ServerValidateToastificationContent.vue';
// import defineAbilityFor from "@/services/acl";
// import { toast } from 'vue3-toastify';

export default class JwtService {
  store = null

  // Will be used by this service for making API calls
  httpClientIns = null

  private wsClient: WSServiceInterface

  // jwtConfig <= Will be used by this service
  jwtConfig = {
    ...jwtDefaultConfig,
  }

  // For Refreshing Token
  isAlreadyFetchingAccessToken = false

  toast = null

  // For Refreshing Token
  subscribers = []

  constructor(httpClientIns: AxiosInstance, jwtOverrideConfig: object) {
    this.store = useAuthStore()
    this.httpClientIns = httpClientIns
    this.wsClient = useWS()
    this.jwtConfig = {
      ...this.jwtConfig,
      ...jwtOverrideConfig,
    }

    // this.store.$subscribe((mutation, state) => {
    //   const profileStore = useProfileStore().showAsync
    // })

    // // Request Interceptor
    // this.httpClientIns.interceptors.request.use(
    //   config => {
    //     // Get token from localStorage
    //     const accessToken = this.getToken()

    //     // If token is present add it to request's Authorization Header
    //     if (accessToken) {
    //       // eslint-disable-next-line no-param-reassign
    //       config.headers.Authorization = `${this.jwtConfig.tokenType} ${accessToken}`
    //     }
    //     return config
    //   },
    //   error => Promise.reject(error),
    // )

    // Add request/response interceptor
    this.httpClientIns.interceptors.response.use(
      (response) => response,
      (error) => {
        const { config, response } = error
        const originalRequest = config

        if (response && response.status === HttpStatusCode.Unauthorized) {
          if (!this.isAlreadyFetchingAccessToken) {
            this.isAlreadyFetchingAccessToken = true
            this.refreshToken().then((r) => {
              this.isAlreadyFetchingAccessToken = false
              const {
                access_token: accessToken,
                refresh_token: refreshToken,
                // auth_data: authData,
              } = r.data

              // Update accessToken in localStorage
              this.setAccessToken(accessToken)
              this.setRoleAndPermissionPermissions(accessToken)
              this.setRefreshToken(refreshToken)
              this.setAuthData()

              this.onAccessTokenFetched(accessToken)
            })
          }

          const retryOriginalRequest = new Promise((resolve) => {
            this.addSubscriber((accessToken) => {
              // Make sure to assign accessToken according to your response.
              // Check: https://pixinvent.ticksy.com/ticket/2413870
              // Change Authorization header
              originalRequest.headers.Authorization = `${this.jwtConfig.tokenType} ${accessToken}`
              resolve(this.httpClientIns(originalRequest))
            })
          })

          return retryOriginalRequest
        }

        return Promise.reject(error)
      },
    )
  }

  onAccessTokenFetched(accessToken) {
    this.subscribers = this.subscribers.filter((callback) => callback(accessToken))
  }

  addSubscriber(callback) {
    this.subscribers.push(callback)
  }

  getRefreshToken() {
    return localStorage.getItem(this.jwtConfig.storageRefreshTokenKeyName)
  }

  setAccessToken(value: string): void {
    // store.commit('auth/setAccessToken', value);
    this.store.setAccessToken(jwtDefaultConfig.storageAccessTokenKeyName, value)
    this.wsClient.loadAccessToken()
    // store.dispatch('ws/centrifuge/loadWSAccessTokenAsync');
  }

  setRefreshToken(value: string): void {
    this.store.setRefreshToken(this.jwtConfig.storageRefreshTokenKeyName, value)
  }

  async login(args: LoginInterface): Promise<unknown> {
    return await new Promise((resolve, reject) => {
      return this.httpClientIns
        .post(this.jwtConfig.loginEndpoint, { ...args })
        .then((response: object) => {
          const { access_token: accessToken, refresh_token: refreshToken } = response.data

          this.setAccessToken(accessToken)
          this.setRefreshToken(refreshToken)
          this.setAuthData()
          this.setRoleAndPermissionPermissions(accessToken)

          // userData.role.permissions = [...userData.role.permissions, ...initialAbility, ...profileAbility]
          // localStorage.setItem('userData', JSON.stringify(userData))
          // this.$ability.update(userData.role.permissions.length ? userData.role.permissions : initialAbility)

          return resolve(response)
        })
        .catch((error) => reject(error))
    })
  }

  // register(...args) {
  //   const response = this.httpClientIns.post(this.jwtConfig.registerEndpoint, ...args);

  //   return response;
  // }

  forgotPassword(args: ForgotPasswordInterface) {
    return this.httpClientIns.post(this.jwtConfig.forgotPasswordEndpoint, { ...args })
  }

  restorePassword(args: RestorePasswordInterface) {
    return this.httpClientIns.post(this.jwtConfig.restorePasswordEndpoint, { ...args })
  }

  refreshToken() {
    return this.httpClientIns.post(this.jwtConfig.refreshEndpoint, {
      refresh_token: this.getRefreshToken(),
    })
  }

  logout(args: object | null = null) {
    return this.httpClientIns.post(this.jwtConfig.logoutEndpoint, { ...args }).finally(() => {
      this.logouted()

      // Reset ability
      // vue.$ability.update(guestAbility)
      getActivePinia()._s.forEach((store) => store.$reset())

      // Remove userData from localStorage
      // ? You just removed token from localStorage. If you like, you can also make API call to backend to blacklist used token
      const authClearKeys = [
        this.jwtConfig.storageAccessTokenKeyName,
        this.jwtConfig.storageRefreshTokenKeyName,
        this.jwtConfig.storageAuthDataKeyName,
        this.jwtConfig.storageRoleKeyName,
        this.jwtConfig.storagePermissionKeyName,
        'ws_access_token',
      ]

      authClearKeys.forEach((key: string) => localStorage.removeItem(key))

      // Redirect to login page
      // router.push({
      //   name: 'login'
      // });

      // store?.reset();
    })
  }

  setAuthData() {
    const self = this

    useProfileStore()
      .showAsync()
      .then((response): void => {
        self.store.setAuthData(this.jwtConfig.storageAuthDataKeyName, {
          ...response.data,
          uuid: 'a81478a8-08fa-4fab-b502-b28a69d17149',
        })
      })
  }

  setRoleAndPermissionPermissions(payload: string): void {
    const { role } = jwtDecode<JwtPayload>(payload)
    const { permissions } = role

    this.store.setRole(this.jwtConfig.storageRoleKeyName, {
      is_super_admin: role.is_super_admin,
      value: role.value,
    })
    this.store.setPermissions(this.jwtConfig.storagePermissionKeyName, permissions)
  }

  logouted() {
    // const handlers = [
    //   () => {
    //     const wsSubscriptions = this.centrifuge.subscriptions();
    //     for (const channelName in wsSubscriptions) {
    //       if (Object.prototype.hasOwnProperty.call(wsSubscriptions, channelName)) {
    //         const subscriber = wsSubscriptions[channelName];
    //         this.centrifuge.removeSubscription(subscriber);
    //       }
    //     }
    //   }
    // ]
    // handlers.forEach(callback => callback())
  }
}
