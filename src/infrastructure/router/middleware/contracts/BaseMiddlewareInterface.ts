export abstract class BaseMiddlewareInterface {
  abstract handle({ next }, accessToken: string | null): void
}
