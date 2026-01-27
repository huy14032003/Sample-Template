
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


export enum CookieKey {
    ACCESS_TOKEN = 'access_token',
    REFRESH_TOKEN = 'refresh_token',
    ACCESS_TOKEN_EXPIRY = 'access_token_expiry'
}

export const CookieExpiry = {
    ACCESS_TOKEN_MINUTES: 5,
    REFRESH_TOKEN_MINUTES: 60,
    ACCESS_TOKEN_SECONDS: 300,
    REFRESH_TOKEN_SECONDS: 3600,
    REFRESH_THRESHOLD_SECONDS: 30 // Refresh khi còn 30s
} as const


export const FETCH_ERROR = 'FETCH_ERROR' as const
