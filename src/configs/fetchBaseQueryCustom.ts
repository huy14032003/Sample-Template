import { ApiErrorResponse, RefreshResponse, RequestArgs, TokenType } from "@/types/fetchBaseQuery.type";
import { CookieKey, CookieExpiry, FETCH_ERROR, HttpStatus } from "@/constants/fetchBaseCustom.constant";
import { baseQueryCustom, baseRefreshQuery, feeBaseQueryCustom } from "@/services/apiService";
import { callApi, isInWhiteList, normalizePathname } from "@/utils/helperFuntion";
import { BaseQueryApi, BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/query";
import Cookies from "js-cookie";
import { startLoading, stopLoading } from "@/stores/slices/loadingSlice";
import { setAccessToken, shouldRefreshToken, clearTokens } from "@/utils/tokenUtils";
import { setAccessToken as setAccessTokenAction } from "@/stores/slices/authSlice";

let isRefreshing = false;
let refreshPromise: Promise<string | null> | null = null;

const refreshAccessToken = async (api: BaseQueryApi, extraOptions: Record<string, unknown>): Promise<string | null> => {
  if (isRefreshing && refreshPromise) {
    return refreshPromise;
  }

  isRefreshing = true;

  refreshPromise = (async () => {
    try {
      const refreshToken = Cookies.get(CookieKey.REFRESH_TOKEN);
      if (!refreshToken) return null;

      const refreshResult = await callApi<RefreshResponse>(
        baseRefreshQuery,
        { url: "/auth/refresh", method: "POST", body: { refreshToken } },
        api,
        extraOptions,
      );

      const data = refreshResult?.data;
      const newAccessToken = data?.[TokenType.ACCESS_TOKEN];

      if (!newAccessToken) return null;

      // Sử dụng expiresIn từ API (đơn vị giây), fallback 300 giây
      const expiresInSeconds = data?.[TokenType.EXPIRES_IN] || CookieExpiry.ACCESS_TOKEN_SECONDS;

      // Lưu access token và expiry time vào cookie
      setAccessToken(newAccessToken, expiresInSeconds);

      // Cập nhật Redux store với token mới (decode permissions/roles từ token)
      api.dispatch(setAccessTokenAction(newAccessToken));

      if (data?.[TokenType.REFRESH_TOKEN]) {
        // Sử dụng refreshExpiresIn từ API (đơn vị giây), fallback 3600 giây
        const refreshExpiresInSeconds = data?.[TokenType.REFRESH_EXPIRES_IN] || CookieExpiry.REFRESH_TOKEN_SECONDS;
        const refreshExpiresInDays = refreshExpiresInSeconds / 86400;
        Cookies.set(CookieKey.REFRESH_TOKEN, data[TokenType.REFRESH_TOKEN], { expires: refreshExpiresInDays });
      }

      return newAccessToken;
    } catch (error) {
      console.error("[Auth] Refresh token failed:", error);
      return null;
    } finally {
      isRefreshing = false;
      refreshPromise = null;
    }
  })();

  return refreshPromise;
};

const forceLogout = (): void => {
  clearTokens();
  window.location.href = "/auth/login";
};

// ============================================================================
// FACTORY FUNCTION - Create custom base query with loading & error handling
// ============================================================================

/**
 * Factory function to create custom base query with:
 * - Loading indicator management (with whitelist)
 * - Automatic token refresh on 401 Unauthorized
 * - Error notification handling
 *
 * @param baseQuery - The base fetch query to wrap
 * @returns Custom base query function
 */
const createCustomBaseQuery = (
  baseQuery: ReturnType<typeof fetchBaseQuery>,
): BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> => {
  return async (args, api, extraOptions) => {
    const pathName = normalizePathname(window.location.pathname);

    const requestArgs = args as RequestArgs;
    const isLoading = requestArgs?.params?.isLoading;
    const apiEndPoint = typeof args === "string" ? args : requestArgs?.url;

    // ============================================================================
    // PROACTIVE TOKEN REFRESH - Check và refresh token trước khi call API
    // ============================================================================
    if (shouldRefreshToken()) {
      const newAccessToken = await refreshAccessToken(api, extraOptions as Record<string, unknown>);

      if (!newAccessToken) {
        // Nếu refresh thất bại, logout ngay
        alert("Đã hết phiên đăng nhập, vui lòng đăng nhập lại để tiếp tục!");
        forceLogout();
        return {
          error: {
            status: HttpStatus.UNAUTHORIZED,
            data: { message: "Session expired" },
          },
        } as { error: FetchBaseQueryError };
      }
    }

    // Show loading if not disabled and not in whitelist
    const shouldShowLoading = isLoading !== false && !isInWhiteList(apiEndPoint, pathName);

    if (shouldShowLoading) {
      api.dispatch(startLoading());
    }

    const result = await baseQuery(args, api, extraOptions);

    // Always hide loading after request completes
    if (shouldShowLoading) {
      api.dispatch(stopLoading());
    }

    if (result.error && result.error.status) {
      const status = result.error.status;

      switch (status) {
        case HttpStatus.UNAUTHORIZED: {
          const newAccessToken = await refreshAccessToken(api, extraOptions as Record<string, unknown>);

          if (!newAccessToken) {
            alert("Đã hết phiên đăng nhập, vui lòng đăng nhập lại để tiếp tục!");
            forceLogout();
            break;
          }

          return await baseQuery(args, api, extraOptions);
        }

        case HttpStatus.BAD_REQUEST: {
          const errorData = result.error.data as ApiErrorResponse;
          if (errorData?.message) {
            // openNotification(errorData.message)
          }
          break;
        }

        case FETCH_ERROR:
          break;

        default: {
          const errorData = result.error.data as ApiErrorResponse;
          if (errorData?.message) {
            // dsas
          }
          break;
        }
      }
    }

    return result;
  };
};

// ============================================================================
// EXPORTED CUSTOM BASE QUERIES
// ============================================================================
export const fetchBaseQueryCustom = createCustomBaseQuery(baseQueryCustom);
export const fetchBaseQueryFee = createCustomBaseQuery(feeBaseQueryCustom);
