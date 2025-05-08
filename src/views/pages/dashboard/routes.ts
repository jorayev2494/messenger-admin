import { MiddlewareEnum } from '@/infrastructure/router/middleware/enums/MiddlewareEnum'

export default [
  {
    path: 'dashboard',
    name: 'dashboard',
    component: () => import('./pages/index/Index.vue'),
    meta: {
      middleware: [MiddlewareEnum.AUTH],
    },
  },
]
