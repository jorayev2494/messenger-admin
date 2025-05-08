import { BaseMiddlewareInterface } from '@/infrastructure/router/middleware/contracts/BaseMiddlewareInterface'
import Tr from '@/infrastructure/translations/translation'

export class GuestMiddleware extends BaseMiddlewareInterface {
  public handle({ next }, accessToken: string | null): void {
    if (accessToken !== null) {
      next(Tr.route({ name: 'dashboard' }))
    }
  }
}
