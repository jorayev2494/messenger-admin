export const RESOURCE = 'client'

// Action
export enum Action {
  INDEX = 'index',
  CREATE = 'create',
  SHOW = 'show',
  UPDATE = 'update',
  DELETE = 'delete',
}

// Resource Action
export enum ResourceAction {
  RESOURCE_INDEX = Action.INDEX + '-' + RESOURCE,
  RESOURCE_CREATE = Action.CREATE + '-' + RESOURCE,
  RESOURCE_SHOW = Action.SHOW + '-' + RESOURCE,
  RESOURCE_UPDATE = Action.UPDATE + '-' + RESOURCE,
  RESOURCE_DELETE = Action.DELETE + '-' + RESOURCE,
}
