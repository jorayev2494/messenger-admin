import { Centrifuge, Subscription } from 'centrifuge'
import type { WSServiceInterface } from '../contracts/WSServiceInterface'
import type { Store } from 'pinia'

export default class WSService implements WSServiceInterface {
  private constructor(
    private wsClient: Centrifuge,
    private store: Store<'centrifuge'>,
    private config: object = {},
  ) {}

  private init(): void {}

  public static make(
    wsClient: Centrifuge,
    store: Store<'centrifuge'>,
    config: object = {},
  ): WSServiceInterface {
    return new WSService(wsClient, store, config)
  }

  public makeSubscription(channel: string): Subscription {
    return this.wsClient.newSubscription(channel)
  }

  public loadAccessToken(): void {
    this.store.loadAccessTokenAsync()
  }
}
