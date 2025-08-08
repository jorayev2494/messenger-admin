import { makeRouterPermission } from '@/services/acl/useACLProtection'
import { RouteName } from './RouteName'
import { ResourceAction } from '../acl/ACLEnum'

export default [
  {
    path: 'drivers',
    name: RouteName.INDEX,
    component: () => import('../pages/index/Index.vue'),
    meta: {
      title: 'driver.context_title',
      ...makeRouterPermission([ResourceAction.RESOURCE_INDEX]),
      breadcrumbs: [
        {
          label: 'dashboard.context_title',
          route: {
            name: 'dashboard',
          },
        },
        {
          label: 'driver.context_title',
          route: {
            name: 'manager-index',
          },
        },
      ],
    },
  },
  {
    path: 'drivers/create',
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
          label: 'driver.context_title',
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
    path: 'drivers/:uuid/show',
    name: RouteName.SHOW,
    component: () => import('../pages/show/Index.vue'),
    meta: {
      title: 'system.show',
      ...makeRouterPermission([ResourceAction.RESOURCE_SHOW]),
      breadcrumbs: [
        {
          label: 'dashboard.context_title',
          route: {
            name: 'dashboard',
          },
        },
        {
          label: 'driver.context_title',
          route: {
            name: RouteName.INDEX,
          },
        },
        {
          label: 'system.show',
        },
      ],
    },
  },
  {
    path: 'drivers/:uuid/edit',
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
          label: 'driver.context_title',
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
