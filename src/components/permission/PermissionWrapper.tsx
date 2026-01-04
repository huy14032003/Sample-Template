import React from 'react'
import usePermission from '@/hooks/usePermission'

interface PermissionWrapperProps {
    /**
     * Single permission or array of permissions to check
     * E.g., 'EWALLET:FEE:DELETE' or ['EWALLET:FEE:DELETE', 'EWALLET:FEE:UPDATE']
     */
    permission: string | string[]

    /**
     * How to evaluate multiple permissions
     * 'any' = OR logic (user needs at least one permission)
     * 'all' = AND logic (user needs all permissions)
     * Default: 'any'
     */
    mode?: 'any' | 'all'

    /**
     * What to render when user doesn't have permission
     * Default: null (renders nothing)
     */
    fallback?: React.ReactNode

    /**
     * Content to render when user has permission
     */
    children: React.ReactNode
}

/**
 * Wrapper component to conditionally render UI elements based on user permissions
 * 
 * @example
 * // Single permission
 * <PermissionWrapper permission="EWALLET:FEE:DELETE">
 *   <Button onClick={handleDelete}>Delete</Button>
 * </PermissionWrapper>
 * 
 * @example
 * // Multiple permissions with OR logic (default)
 * <PermissionWrapper permission={['EWALLET:FEE:UPDATE', 'EWALLET:FEE:DELETE']}>
 *   <ActionButtons />
 * </PermissionWrapper>
 * 
 * @example
 * // Multiple permissions with AND logic
 * <PermissionWrapper permission={['EWALLET:FEE:VIEW', 'EWALLET:ADMIN:VIEW']} mode="all">
 *   <AdminPanel />
 * </PermissionWrapper>
 * 
 * @example
 * // With fallback content
 * <PermissionWrapper 
 *   permission="EWALLET:FEE:DELETE" 
 *   fallback={<span>No permission to delete</span>}
 * >
 *   <Button onClick={handleDelete}>Delete</Button>
 * </PermissionWrapper>
 */
export const PermissionWrapper: React.FC<PermissionWrapperProps> = ({
    permission,
    mode = 'any',
    fallback = null,
    children,
}) => {
    const { hasPermission, hasAnyPermission, hasAllPermissions } = usePermission()

    const hasAccess = React.useMemo(() => {
        if (Array.isArray(permission)) {
            return mode === 'all'
                ? hasAllPermissions(permission)
                : hasAnyPermission(permission)
        }
        return hasPermission(permission)
    }, [permission, mode, hasPermission, hasAnyPermission, hasAllPermissions])

    if (!hasAccess) {
        return <>{fallback}</>
    }

    return <>{children}</>
}

export default PermissionWrapper
