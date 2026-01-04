

// ============================================================================
// ENUMS
// ============================================================================


export enum HttpStatus {
    OK = 200,
    CREATED = 201,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500
}


export enum NotificationType {
    SUCCESS = 'success',
    ERROR = 'error',
    WARNING = 'warning',
    INFO = 'info'
}

export enum TokenType {
    ACCESS_TOKEN = 'accessToken',
    REFRESH_TOKEN = 'refreshToken',
    EXPIRES_IN = 'expiresIn',
    REFRESH_EXPIRES_IN = 'refreshExpiresIn'
}

/**
 * Cookie storage keys (snake_case for cookie naming convention)
 */
export enum CookieKey {
    ACCESS_TOKEN = 'access_token',
    REFRESH_TOKEN = 'refresh_token'
}

// Default expiry values in SECONDS (matching API response format)
export const CookieExpiry = {
    ACCESS_TOKEN_SECONDS: 300,    // 5 minutes
    REFRESH_TOKEN_SECONDS: 1800   // 30 minutes  
} as const


export const FETCH_ERROR = 'FETCH_ERROR' as const

// ============================================================================
// INTERFACES
// ============================================================================


export interface WhiteListItem {
    pathname: string
    apiEndPoint: string
}


export interface TokenData {
    accessToken: string
    expiresIn: number
    refreshToken: string
    refreshExpiresIn: number
}


export interface RefreshResponse {
    data: TokenData
    message: string
    detail: string
    success: boolean
    status: string
}


export interface ApiErrorResponse {
    message?: string
    detail?: string
}


export interface RequestArgs {
    url?: string
    params?: {
        isLoading?: boolean
        [key: string]: unknown
    }
    [key: string]: unknown
}





// ============================================================================
// GENERIC API HELPER
// ============================================================================

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

export interface ApiConfig {
    url: string
    method: HttpMethod
    body?: unknown
}

