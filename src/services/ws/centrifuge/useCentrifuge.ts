import type { Store } from 'pinia'
import type { WSServiceInterface } from '../contracts/WSServiceInterface'
import WSService from './WSService'
import type { Centrifuge } from 'centrifuge'

interface Interface {
  WS(): WSServiceInterface
}

export default function useCentrifuge(
  wsClientIns: Centrifuge,
  store: Store,
  config: object = {},
): Interface {
  const WS = () => WSService.make(wsClientIns, store, config)

  return {
    WS,
  }
}
