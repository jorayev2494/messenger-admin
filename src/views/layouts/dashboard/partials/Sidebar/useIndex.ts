import { RouteName as ManagerRouteName } from '@/views/pages/manager/routes/RouteName'
import { RouteName as ClientRouteName } from '@/views/pages/client/routes/RouteName'
import { RouteName as DriverRouteName } from '@/views/pages/driver/routes/RouteName'
import { RouteName as BrandRouteName } from '@/views/pages/brand/routes/RouteName'
import { RouteName as ModelRouteName } from '@/views/pages/model/routes/RouteName'
import { RouteName as CountryRouteName } from '@/views/pages/country/routes/RouteName'
import { RouteName as PlaceRouteName } from '@/views/pages/place/routes/RouteName'
import { RouteName as ColorRouteName } from '@/views/pages/color/routes/RouteName'
import { RouteName as CarRouteName } from '@/views/pages/car/routes/RouteName'
import { RouteName as RoleRouteName } from '@/views/pages/role/routes/RouteName'
import { makeAnyPermission, makePermission } from '@/services/acl/useACLProtection'

import { ResourceAction as ManagerResourceAction } from '@/views/pages/manager/acl/ACLEnum'
import { ResourceAction as ClientResourceAction } from '@/views/pages/client/acl/ACLEnum'
import { ResourceAction as DriverResourceAction } from '@/views/pages/driver/acl/ACLEnum'
import { ResourceAction as BrandResourceAction } from '@/views/pages/brand/acl/ACLEnum'
import { ResourceAction as ModelResourceAction } from '@/views/pages/brand/acl/ACLEnum'
import { ResourceAction as CountryResourceAction } from '@/views/pages/country/acl/ACLEnum'
import { ResourceAction as PlaceResourceAction } from '@/views/pages/place/acl/ACLEnum'
import { ResourceAction as ColorResourceAction } from '@/views/pages/color/acl/ACLEnum'
import { ResourceAction as CarResourceAction } from '@/views/pages/car/acl/ACLEnum'
import { ResourceAction as RoleResourceAction } from '@/views/pages/role/acl/ACLEnum'
import type { EnumType } from 'typescript'

interface Result {
  activeClassName: string
  navItems: object[]
}

export default function (): Result {
  const activeClassName = 'router-link-active router-link-exact-active'
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
          label: 'driver.context_title',
          icon: 'ri-shield-user-line',
          route: {
            name: DriverRouteName.INDEX,
          },
          meta: {
            ...makePermission([DriverResourceAction.RESOURCE_INDEX]),
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
        {
          label: 'brand.context_title',
          icon: 'ri-shield-user-line',
          route: {
            name: BrandRouteName.INDEX,
          },
          meta: {
            ...makePermission([BrandResourceAction.RESOURCE_INDEX]),
          },
        },
        {
          label: 'model.context_title',
          icon: 'ri-shield-user-line',
          route: {
            name: ModelRouteName.INDEX,
          },
          meta: {
            ...makePermission([ModelResourceAction.RESOURCE_INDEX]),
          },
        },
        {
          label: 'country.context_title',
          icon: 'ri-shield-user-line',
          route: {
            name: CountryRouteName.INDEX,
          },
          meta: {
            ...makePermission([CountryResourceAction.RESOURCE_INDEX]),
          },
        },
        {
          label: 'place.context_title',
          icon: 'ri-shield-user-line',
          route: {
            name: PlaceRouteName.INDEX,
          },
          meta: {
            ...makePermission([PlaceResourceAction.RESOURCE_INDEX]),
          },
        },
        {
          label: 'color.context_title',
          icon: 'ri-shield-user-line',
          route: {
            name: ColorRouteName.INDEX,
          },
          meta: {
            ...makePermission([ColorResourceAction.RESOURCE_INDEX]),
          },
        },
        {
          label: 'car.context_title',
          icon: 'ri-shield-user-line',
          route: {
            name: CarRouteName.INDEX,
          },
          meta: {
            ...makePermission([CarResourceAction.RESOURCE_INDEX]),
            routeNameEnum: CarRouteName,
          },
        },
      ],
    },
  ]

  const isActive = (routeNameEnum: EnumType, routeName: string): boolean => {
    return Object.values<string>(CarRouteName).includes(routeName)
  }

  return {
    activeClassName,
    navItems,
    isActive,
  }
}
