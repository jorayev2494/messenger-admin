import type { Centrifuge } from 'centrifuge'
import { singleton } from './init'

export const useCentrifuge = (): Centrifuge => singleton.getInstance()
