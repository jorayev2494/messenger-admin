import { AuthMiddleware } from '@/infrastructure/router/middleware/AuthMiddleware'
import { GuestMiddleware } from '@/infrastructure/router/middleware/GuestMiddleware'
import { MiddlewareEnum } from './enums/MiddlewareEnum'
import { BaseMiddlewareInterface } from './contracts/BaseMiddlewareInterface'
import { useAuthStore } from '@/views/pages/auth/store/auth'

const middlewares: { [key: string]: BaseMiddlewareInterface } = {
  [MiddlewareEnum.AUTH]: new AuthMiddleware(),
  [MiddlewareEnum.GUEST]: new GuestMiddleware(),
}

const getMiddleware = (key: string): BaseMiddlewareInterface | null => middlewares[key] ?? null

export const checkMiddleware = (to, from, next: Function): void => {
  if (to.meta.hasOwnProperty('middleware')) {
    const authStore = useAuthStore()
    const accessToken: string | null = authStore.getAccessToken

    to.meta.middleware.forEach((nameMiddleware: string): void => {
      const middleware = getMiddleware(nameMiddleware)

      if (middleware instanceof BaseMiddlewareInterface) {
        middleware.handle({ to, from, next }, accessToken)
      }
    })

    next()
  } else {
    // Non-protected route, allow access
    next()
  }
}
