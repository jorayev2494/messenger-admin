import { MiddlewareEnum } from '@/infrastructure/router/middleware/enums/MiddlewareEnum'
import { RouteName } from './RouteName'

export default [
  {
    path: 'auth',
    name: RouteName.PREFIX,
    redirect: { name: RouteName.LOGIN },
    component: () => import('@/views/layouts/auth/Index.vue'),
    children: [
      {
        path: 'login',
        name: RouteName.LOGIN,
        component: () => import('../pages/login/Index.vue'),
        meta: {
          middleware: [MiddlewareEnum.GUEST],
        },
      },
      {
        path: 'forgot-password',
        name: RouteName.FORGOT_PASSWORD,
        component: () => import('../pages/forgotPassword/Index.vue'),
        meta: {
          middleware: [MiddlewareEnum.GUEST],
        },
      },
      {
        path: 'restore-password',
        name: RouteName.RESTORE_PASSWORD,
        component: () => import('../pages/restorePassword/Index.vue'),
        meta: {
          middleware: [MiddlewareEnum.GUEST],
        },
      },
    ],
  },
]
