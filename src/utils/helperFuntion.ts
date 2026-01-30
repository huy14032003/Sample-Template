import { BaseQueryApi, fetchBaseQuery } from '@reduxjs/toolkit/query'
import Cookies from 'js-cookie'
import { ApiConfig, CookieKey, WhiteListItem } from "@/types/fetchBaseQuery.type"
import { matchPath } from 'react-router-dom'
import { platformNavItems } from '@/configs/nav-config'
import { WHITE_LIST } from '@/constants/whiteList.constant'


// ============================================================================
// HELPER FUNCTIONS
// ============================================================================


export const isInWhiteList = (apiEndPoint?: string, pathname?: string): WhiteListItem | undefined => {
    return WHITE_LIST.find((item) => item.pathname === pathname && item.apiEndPoint === apiEndPoint)
}


export const normalizePathname = (pathname: string): string => {
    return pathname.endsWith('/') ? pathname.slice(0, -1) : pathname
}


export const callApi = async <TResponse>(
    baseQuery: ReturnType<typeof fetchBaseQuery>,
    config: ApiConfig,
    api: BaseQueryApi,
    extraOptions: Record<string, unknown>
): Promise<TResponse | null> => {
    const result = await baseQuery(config, api, extraOptions)
    if (result.error) return null
    return result.data as TResponse
}

// ============================================================================
// COOKIE HELPER FUNCTIONS (với security options)
// ============================================================================

/**
 * Default cookie options với security settings
 * - secure: Chỉ gửi qua HTTPS (production)
 * - sameSite: 'strict' để chống CSRF
 */
export const getCookieOptions = (expiresInHours: number = 1): Cookies.CookieAttributes => ({
    secure: window.location.protocol === 'https:',
    sameSite: 'strict',
    expires: expiresInHours / 24, // js-cookie expects days
    path: '/'
})

/**
 * Set access token cookie với security options
 * @param token - Access token string
 * @param expiresInSeconds - Token expiration in seconds (default: 300 = 5 minutes)
 */
export const setAccessTokenCookie = (token: string, expiresInSeconds: number = 300): void => {
    const expiresInDays = expiresInSeconds / 86400 // Convert seconds to days (86400 = 24*60*60)
    Cookies.set(CookieKey.ACCESS_TOKEN, token, {
        secure: window.location.protocol === 'https:',
        sameSite: 'strict',
        expires: expiresInDays,
        path: '/'
    })
}

/**
 * Get access token from cookie
 */
export const getAccessTokenCookie = (): string | undefined => {
    return Cookies.get(CookieKey.ACCESS_TOKEN)
}

/**
 * Remove access token cookie
 */
export const removeAccessTokenCookie = (): void => {
    Cookies.remove(CookieKey.ACCESS_TOKEN, { path: '/' })
}

/**
 * Set refresh token cookie với security options
 * @param token - Refresh token string  
 * @param expiresInSeconds - Token expiration in seconds (default: 1800 = 30 minutes)
 */
export const setRefreshTokenCookie = (token: string, expiresInSeconds: number = 1800): void => {
    const expiresInDays = expiresInSeconds / 86400 // Convert seconds to days
    Cookies.set(CookieKey.REFRESH_TOKEN, token, {
        secure: window.location.protocol === 'https:',
        sameSite: 'strict',
        expires: expiresInDays,
        path: '/'
    })
}


/**
 * Remove refresh token cookie
 */
export const removeRefreshTokenCookie = (): void => {
    Cookies.remove(CookieKey.REFRESH_TOKEN, { path: '/' })
}

/**
 * Remove all auth cookies (for logout)
 */
export const removeAllAuthCookies = (): void => {
    removeAccessTokenCookie()
    removeRefreshTokenCookie()
}


 export const getTitleFromPath = (pathname: string) => {
  const route = platformNavItems.find(r =>
    matchPath({ path: r.url, end: true }, pathname)
  );

  return route?.title ?? "Admin";
};