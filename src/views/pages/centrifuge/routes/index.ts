import { RouteName } from './RouteName'

export default [
  {
    path: 'centrifuge',
    name: RouteName.INDEX,
    component: () => import('../pages/index/Index.vue'),
    meta: {
      title: 'centrifuge.context_title',
      breadcrumbs: [
        {
          label: 'dashboard.context_title',
          route: {
            name: 'dashboard',
          },
        },
        {
          label: 'centrifuge.context_title',
          route: {
            name: RouteName.INDEX,
          },
        },
      ],
    },
  },
]
