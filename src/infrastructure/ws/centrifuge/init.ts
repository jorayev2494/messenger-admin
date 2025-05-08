import { Centrifuge } from 'centrifuge'
import { useCentrifugeStore } from './store'
import { EventEnum } from './EventEnum'

// const token = store.getters['ws/centrifuge/getWSAccessToken']

export const singleton = (function () {
  // const token: string =
  //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM3MjIiLCJleHAiOjE3NDM0MTg5NTEsImlhdCI6MTc0MjgxNDE1MX0.RcWHjI_knstlDULDCPqo3y0qtQNmpBj1q2iXJAled2M'

  const store = useCentrifugeStore()
  const token: string = store?.getAccessToken

  const timestamp: string = parseInt(new Date().getTime() / 1000).toString()

  let instance: Centrifuge | null

  const createInstance = (): Centrifuge => {
    const WS_ENDPOINT = `${process.env.VUE_APP_WS_SERVER_ENDPOINT}/connection/websocket`

    const centrifuge: Centrifuge = new Centrifuge(WS_ENDPOINT, {
      debug: true,
      // user: '9bf048cd-4dd7-4b97-8a7c-07b6b20c6905',
      token,
      // timestamp,
      // data: {
      //   authToken: token,
      // }
      // transports: ["websocket", "xhr-streaming"],
    })

    // centrifuge.setToken(token);
    centrifuge.on(EventEnum.PUBLISH, function (ctx: any): void {
      const channel = ctx.channel
      const payload = JSON.stringify(ctx.data)
      console.log('⚡ Publication from server-side channel', channel, payload)
    })

    centrifuge
      .on(EventEnum.CONNECTING, function (ctx: any): void {
        console.log(`⚡ connecting: ${ctx.code}, ${ctx.reason}`, ctx)
      })
      .on(EventEnum.CONNECTED, function (ctx: any): void {
        console.log(`⚡ connected over ${ctx.transport}`, ctx)
      })
      .on(EventEnum.DISCONNECTED, function (ctx) {
        console.log(`⚡ disconnected: ${ctx.code}, ${ctx.reason}`, ctx)
      })
      .connect()

    const sub = centrifuge.newSubscription('health')
    // const sub = centrifuge.newSubscription('channel#9bf048cd-4dd7-4b97-8a7c-07b6b20c6905');

    sub
      .on(EventEnum.PUBLICATION, (ctx: any): void => {
        console.log('⚡ Health publication: ', ctx)
      })
      .on(EventEnum.SUBSCRIBING, (ctx: any): void => {
        console.log('⚡ Health subscribing: ', ctx)
      })
      .on(EventEnum.SUBSCRIBED, (ctx: any): void => {
        console.log('⚡ Health subscribed: ', ctx)
      })
      .on(EventEnum.UNSUBSCRIBED, (ctx: any): void => {
        console.log(`⚡ Health unsubscribed: ${ctx.code}, ${ctx.reason}`, ctx)
      })
      .subscribe()

    return centrifuge
  }

  return {
    getInstance: (): Centrifuge => (!instance ? (instance = createInstance()) : instance),
  }
})()

export const instance = singleton.getInstance()

export const getInstance = (): Centrifuge => singleton.getInstance()
