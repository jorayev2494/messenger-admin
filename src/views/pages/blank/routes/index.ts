import { RouteName } from './RouteName'

export default [
  {
    path: 'managers',
    name: RouteName.INDEX,
    component: () => import('../pages/index/Index.vue'),
    meta: {
      title: 'manager.context_title',
      breadcrumbs: [
        {
          label: 'dashboard.context_title',
          route: {
            name: 'dashboard',
          },
        },
        {
          label: 'manager.context_title',
          route: {
            name: 'manager-index',
          },
        },
      ],
    },
  },
]
