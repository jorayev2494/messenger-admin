import { RouteName } from './RouteName'

export default [
  {
    path: 'profile',
    name: RouteName.SHOW,
    component: () => import('../pages/index/Index.vue'),
    meta: {
      title: 'profile.context_title',
      breadcrumbs: [
        {
          label: 'dashboard.context_title',
          route: {
            name: 'dashboard',
          },
        },
        {
          label: 'profile.context_title',
        },
      ],
    },
  },
  {
    path: 'profile/edit',
    name: RouteName.EDIT,
    component: () => import('../pages/edit/Index.vue'),
    meta: {
      title: 'system.edit',
      breadcrumbs: [
        {
          label: 'dashboard.context_title',
          route: {
            name: 'dashboard',
          },
        },
        {
          label: 'profile.context_title',
          route: {
            name: RouteName.SHOW,
          },
        },
        {
          label: 'system.edit',
          route: {
            name: RouteName.SHOW,
          },
        },
      ],
    },
  },
]
