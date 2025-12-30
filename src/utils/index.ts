
import { JwtPayload } from '@/types/auth/auth.types'
import { jwtDecode } from 'jwt-decode'



export const decodeToken = (token: string): { permissions: string[], roles: string[], email: string, name: string } => {
    try {
        const decoded = jwtDecode<JwtPayload>(token)
        return {
            permissions: decoded.permissions || [],
            roles: decoded.roles || [],
            email: decoded.email || decoded.preferred_username || decoded.sub || '',
            name: decoded.name || ''
        }
    } catch (error) {
        console.error('Error decoding token:', error)
        return { permissions: [], roles: [], email: '', name: '' }
    }
}
