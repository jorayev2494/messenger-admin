import { makeRouterPermission } from '@/services/acl/useACLProtection'
import { RouteName } from './RouteName'
import { ResourceAction } from '../acl/ACLEnum'

export default [
  {
    path: 'roles',
    name: RouteName.INDEX,
    component: () => import('../pages/index/Index.vue'),
    meta: {
      title: 'role.context_title',
      ...makeRouterPermission([ResourceAction.RESOURCE_INDEX]),
      breadcrumbs: [
        {
          label: 'dashboard.context_title',
          route: {
            name: 'dashboard',
          },
        },
        {
          label: 'role.context_title',
          route: {
            name: RouteName.INDEX,
          },
        },
      ],
    },
  },
  {
    path: 'roles/create',
    name: RouteName.CREATE,
    component: () => import('../pages/create/Index.vue'),
    meta: {
      title: 'role.context_title',
      ...makeRouterPermission([ResourceAction.RESOURCE_CREATE]),
      breadcrumbs: [
        {
          label: 'dashboard.context_title',
          route: {
            name: 'dashboard',
          },
        },
        {
          label: 'role.context_title',
          route: {
            name: RouteName.INDEX,
          },
        },
        {
          label: 'system.create',
          route: {
            name: RouteName.CREATE,
          },
        },
      ],
    },
  },
  {
    path: 'roles/:uuid/show',
    name: RouteName.SHOW,
    component: () => import('../pages/show/Index.vue'),
    meta: {
      title: 'role.context_title',
      ...makeRouterPermission([ResourceAction.RESOURCE_SHOW]),
      breadcrumbs: [
        {
          label: 'dashboard.context_title',
          route: {
            name: 'dashboard',
          },
        },
        {
          label: 'role.context_title',
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
    path: 'roles/:uuid/edit',
    name: RouteName.EDIT,
    component: () => import('../pages/edit/Index.vue'),
    meta: {
      title: 'role.context_title',
      ...makeRouterPermission([ResourceAction.RESOURCE_UPDATE]),
      breadcrumbs: [
        {
          label: 'dashboard.context_title',
          route: {
            name: 'dashboard',
          },
        },
        {
          label: 'role.context_title',
          route: {
            name: RouteName.INDEX,
          },
        },
        {
          label: 'system.edit',
          route: {
            name: RouteName.EDIT,
          },
        },
      ],
    },
  },
]
