import { RESOURCE, Action, ResourceAction } from './ACLEnum'

export default function (setRule: Function, { isSuperAdmin, allows }): void {
  setRule(
    ResourceAction.RESOURCE_INDEX,
    (): boolean => isSuperAdmin() || allows(RESOURCE, Action.INDEX),
  )
  setRule(
    ResourceAction.RESOURCE_CREATE,
    (): boolean => isSuperAdmin() || allows(RESOURCE, Action.CREATE),
  )
  setRule(
    ResourceAction.RESOURCE_SHOW,
    (): boolean => isSuperAdmin() || allows(RESOURCE, Action.SHOW),
  )
  setRule(
    ResourceAction.RESOURCE_UPDATE,
    (): boolean => isSuperAdmin() || allows(RESOURCE, Action.UPDATE),
  )
  setRule(
    ResourceAction.RESOURCE_DELETE,
    (): boolean => isSuperAdmin() || allows(RESOURCE, Action.DELETE),
  )
}
