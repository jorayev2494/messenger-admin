import type { Subscription } from 'centrifuge'

export interface WSServiceInterface {
  makeSubscription(channel: string): Subscription
  loadAccessToken(): void
}
