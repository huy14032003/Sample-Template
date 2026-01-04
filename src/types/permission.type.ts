export interface IMapping {
  pathName: string[]
  permission: string | null // null = public route
}

// Permission action constants
export const PermissionAction = {
  VIEW: 'VIEW',
  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
  FULL: 'FULL',
} as const

export type PermissionActionType = typeof PermissionAction[keyof typeof PermissionAction]

// Helper to build permission string
export const buildPermission = (module: string, action: PermissionActionType): string => {
  return `EWALLET:${module}:${action}`
}