import { RouteName as ManagerRouteName } from '@/views/pages/manager/routes/RouteName'
import { RouteName as ClientRouteName } from '@/views/pages/client/routes/RouteName'
import { RouteName as RoleRouteName } from '@/views/pages/role/routes/RouteName'
import { makeAnyPermission, makePermission } from '@/services/acl/useACLProtection'

import { ResourceAction as ManagerResourceAction } from '@/views/pages/manager/acl/ACLEnum'
import { ResourceAction as ClientResourceAction } from '@/views/pages/client/acl/ACLEnum'
import { ResourceAction as RoleResourceAction } from '@/views/pages/role/acl/ACLEnum'

interface Result {
  navItems: object[]
}

export default function (): Result {
  const navItems = [
    {
      label: 'Main',
      meta: {
        ...makeAnyPermission([
          ManagerResourceAction.RESOURCE_INDEX,
          RoleResourceAction.RESOURCE_INDEX,
        ]),
      },
      items: [
        {
          label: 'dashboard.context_title',
          icon: 'ri-dashboard-2-fill',
          route: {
            name: 'dashboard',
          },
          meta: {},
        },
        {
          label: 'manager.context_title',
          icon: 'ri-shield-user-fill',
          route: {
            name: ManagerRouteName.INDEX,
          },
          meta: {
            ...makePermission([ManagerResourceAction.RESOURCE_INDEX]),
          },
        },
        {
          label: 'client.context_title',
          icon: 'ri-shield-user-line',
          route: {
            name: ClientRouteName.INDEX,
          },
          meta: {
            ...makePermission([ClientResourceAction.RESOURCE_INDEX]),
          },
        },
        {
          label: 'role.context_title',
          icon: 'ri-shield-keyhole-line',
          route: {
            name: RoleRouteName.INDEX,
          },
          meta: {
            ...makePermission([RoleResourceAction.RESOURCE_INDEX]),
          },
        },
      ],
    },
  ]

  return {
    navItems,
  }
}
