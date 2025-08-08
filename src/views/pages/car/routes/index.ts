import { makeRouterPermission } from '@/services/acl/useACLProtection'
import { RouteName } from './RouteName'
import { ResourceAction } from '../acl/ACLEnum'

export default [
  {
    path: 'cars',
    name: RouteName.INDEX,
    component: () => import('../pages/index/Index.vue'),
    meta: {
      title: 'car.context_title',
      ...makeRouterPermission([ResourceAction.RESOURCE_INDEX]),
      breadcrumbs: [
        {
          label: 'dashboard.context_title',
          route: {
            name: 'dashboard',
          },
        },
        {
          label: 'car.context_title',
          route: {
            name: RouteName.INDEX,
          },
        },
      ],
    },
  },
  {
    path: 'cars/create',
    name: RouteName.CREATE,
    component: () => import('../pages/create/Index.vue'),
    meta: {
      title: 'system.create',
      ...makeRouterPermission([ResourceAction.RESOURCE_CREATE]),
      breadcrumbs: [
        {
          label: 'dashboard.context_title',
          route: {
            name: 'dashboard',
          },
        },
        {
          label: 'car.context_title',
          route: {
            name: RouteName.INDEX,
          },
        },
        {
          label: 'system.create',
        },
      ],
    },
  },
  {
    path: 'cars/:uuid/edit',
    name: RouteName.EDIT,
    component: () => import('../pages/edit/Index.vue'),
    meta: {
      title: 'system.edit',
      ...makeRouterPermission([ResourceAction.RESOURCE_UPDATE]),
      breadcrumbs: [
        {
          label: 'dashboard.context_title',
          route: {
            name: 'dashboard',
          },
        },
        {
          label: 'car.context_title',
          route: {
            name: RouteName.INDEX,
          },
        },
        {
          label: 'system.edit',
        },
      ],
    },
  },
]
