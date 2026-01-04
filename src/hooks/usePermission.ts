import { MappingRouterPermission } from "@/configs/permission.config"
import { useAppSelector } from "@/stores/hooks"
import { useCallback, useMemo } from "react"
import { useLocation } from "react-router-dom"
import { NavItem, NavSubItem } from "@/types/nav.type"

/**
 * Unified permission hook
 * Combines route-based access control and action-based permission checking
 * 
 * Features:
 * - isRouteAccessible: Check if current route is accessible
 * - hasPermission: Check single permission
 * - hasAnyPermission: Check if user has at least one permission
 * - hasAllPermissions: Check if user has all permissions
 * - filterNavItems: Filter nav items by permission for sidebar
 */

export interface UsePermissionReturn {
  isRouteAccessible: boolean
  permissions: string[]
  hasPermission: (permission: string) => boolean
  hasAnyPermission: (permissions: string[]) => boolean
  hasAllPermissions: (permissions: string[]) => boolean
  filterNavItems: (items: NavItem[]) => NavItem[]
}

const usePermission = (): UsePermissionReturn => {
  const location = useLocation()
  const { permissions = [] } = useAppSelector((state) => state.auth.profile) || {}

  /**
   * Get module from permission string (e.g., 'ROLE' from 'EWALLET:ROLE:DELETE')
   */
  const getModule = useCallback((permission: string): string => {
    const parts = permission.split(':')
    // Format: EWALLET:MODULE:ACTION
    if (parts.length === 3 && parts[0] === 'EWALLET') {
      return parts[1]
    }
    // Fallback if different format
    return parts[0]
  }, [])

  /**
   * Check if user has a specific permission
   * Supports exact match and FULL permission (e.g., EWALLET:ROLE:FULL allows all ROLE actions)
   */
  const hasPermission = useCallback(
    (permission: string): boolean => {
      if (!permissions || permissions.length === 0) return false

      // Admin has all permissions
      if (permissions.includes('admin*')) return true

      const module = getModule(permission)
      const fullPermission = `EWALLET:${module}:FULL`

      // Check FULL permission (e.g., EWALLET:ROLE:FULL allows EWALLET:ROLE:DELETE)
      if (permissions.includes(fullPermission)) {
        return true
      }

      // Check exact match
      if (permissions.includes(permission)) {
        return true
      }

      // Check partial match (e.g., permission ends with or includes the required action)
      return permissions.some(
        (p) =>
          p === permission ||
          p.endsWith(`:${permission}`) ||
          p.includes(`:${permission}:`)
      )
    },
    [permissions, getModule]
  )

  /**
   * Check if user has at least one of the specified permissions
   */
  const hasAnyPermission = useCallback(
    (perms: string[]): boolean => {
      return perms.some((perm) => hasPermission(perm))
    },
    [hasPermission]
  )

  /**
   * Check if user has all of the specified permissions
   */
  const hasAllPermissions = useCallback(
    (perms: string[]): boolean => {
      return perms.every((perm) => hasPermission(perm))
    },
    [hasPermission]
  )

  /**
   * Filter nav items based on user permissions
   * Items without permission field are always visible
   */
  const filterNavItems = useCallback(
    (items: NavItem[]): NavItem[] => {
      return items
        .filter((item) => {
          // If no permission required, always show
          if (!item.permission) return true
          // Check if user has the required permission
          return hasPermission(item.permission)
        })
        .map((item) => {
          // Also filter sub-items if they exist
          if (item.items && item.items.length > 0) {
            const filteredSubItems = item.items.filter((subItem: NavSubItem) => {
              if (!subItem.permission) return true
              return hasPermission(subItem.permission)
            })
            return { ...item, items: filteredSubItems }
          }
          return item
        })
        // Remove parent items that have no visible sub-items (if they had sub-items originally)
        .filter((item) => {
          if (item.items && item.items.length === 0) {
            // Check if original had items - if yes and now empty, hide
            const original = items.find((i) => i.title === item.title)
            if (original?.items && original.items.length > 0) {
              return false
            }
          }
          return true
        })
    },
    [hasPermission]
  )

  /**
   * Check if current route is accessible based on MappingRouterPermission
   */
  const isRouteAccessible = useMemo(() => {
    // If no permissions defined, allow all (user might not be logged in yet)
    if (!permissions || permissions.length === 0) {
      return true
    }

    // Root path is always accessible
    if (location.pathname === '/') {
      return true
    }

    // Find matching route in permission mapping
    const routeMapping = MappingRouterPermission.find(
      (item) =>
        item.pathName.some(
          (path) => location.pathname === path || location.pathname.startsWith(path + '/')
        )
    )

    // If route not in mapping, allow access (public route)
    if (!routeMapping) {
      return true
    }

    // If route has null permission, it's public
    if (routeMapping.permission === null) {
      return true
    }

    // Check if user has required permission
    return hasPermission(routeMapping.permission)
  }, [location.pathname, permissions, hasPermission])

  return {
    isRouteAccessible,
    permissions,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    filterNavItems,
  }
}

export default usePermission