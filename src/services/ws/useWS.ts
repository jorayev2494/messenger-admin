import { useCentrifugeStore } from '@/infrastructure/ws/centrifuge/store'
import useCentrifuge from './centrifuge/useCentrifuge'
import { getInstance } from '@/infrastructure/ws/centrifuge/init'

const { WS } = useCentrifuge(getInstance(), useCentrifugeStore(), {})

export default WS
