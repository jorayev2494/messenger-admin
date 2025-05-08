import { BaseMiddlewareInterface } from '@/infrastructure/router/middleware/contracts/BaseMiddlewareInterface'
import Tr from '@/infrastructure/translations/translation'

export class AuthMiddleware extends BaseMiddlewareInterface {
  public handle({ next }, accessToken: string | null): void {
    // For Authorization
    if (accessToken === null) {
      next(Tr.route({ name: 'login' }))
    }
  }
}
