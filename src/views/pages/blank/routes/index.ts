import { makeRouterPermission } from '@/services/acl/useACLProtection'
import { RouteName } from './RouteName'
import { ResourceAction } from '../acl/ACLEnum'

export default [
  {
    path: 'blanks',
    name: RouteName.INDEX,
    component: () => import('../pages/index/Index.vue'),
    meta: {
      title: 'blank.context_title',
      ...makeRouterPermission([ResourceAction.RESOURCE_INDEX]),
      breadcrumbs: [
        {
          label: 'dashboard.context_title',
          route: {
            name: 'dashboard',
          },
        },
        {
          label: 'blank.context_title',
          route: {
            name: RouteName.INDEX,
          },
        },
      ],
    },
  },
]
