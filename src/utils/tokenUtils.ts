import Cookies from "js-cookie";
import { CookieKey, CookieExpiry } from "@/constants/fetchBaseCustom.constant";

/**
 * Lưu access token và expiry time vào cookies
 */
export const setAccessToken = (token: string, expiresInSeconds: number): void => {
  const expiresInDays = expiresInSeconds / 86400;
  const expiryTimestamp = Date.now() + expiresInSeconds * 1000;

  Cookies.set(CookieKey.ACCESS_TOKEN, token, { expires: expiresInDays });
  Cookies.set(CookieKey.ACCESS_TOKEN_EXPIRY, expiryTimestamp.toString(), { expires: expiresInDays });
};

/**
 * Lấy access token từ cookies
 */
export const getAccessToken = (): string | undefined => {
  return Cookies.get(CookieKey.ACCESS_TOKEN);
};

/**
 * Lấy refresh token từ cookies
 */
export const getRefreshToken = (): string | undefined => {
  return Cookies.get(CookieKey.REFRESH_TOKEN);
};

/**
 * Lấy expiry timestamp của access token
 */
export const getAccessTokenExpiry = (): number | null => {
  const expiry = Cookies.get(CookieKey.ACCESS_TOKEN_EXPIRY);
  return expiry ? parseInt(expiry, 10) : null;
};

/**
 * Kiểm tra xem token có hết hạn không
 */
export const isTokenExpired = (): boolean => {
  const expiry = getAccessTokenExpiry();
  if (!expiry) return true;
  return Date.now() >= expiry;
};

/**
 * Kiểm tra xem token có sắp hết hạn không (trong vòng threshold seconds)
 */
export const isTokenExpiringSoon = (thresholdSeconds: number = CookieExpiry.REFRESH_THRESHOLD_SECONDS): boolean => {
  const expiry = getAccessTokenExpiry();
  if (!expiry) return true;

  const timeUntilExpiry = expiry - Date.now();
  return timeUntilExpiry <= thresholdSeconds * 1000;
};

/**
 * Kiểm tra xem có cần refresh token không
 * Token cần refresh nếu:
 * 1. Không có access token nhưng vẫn còn refresh token (access token hết hạn và bị xóa), hoặc
 * 2. Đã hết hạn, hoặc
 * 3. Sắp hết hạn (trong vòng threshold)
 */
export const shouldRefreshToken = (): boolean => {
  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();

  // Nếu không có access token nhưng vẫn còn refresh token → cần refresh
  if (!accessToken && refreshToken) return true;

  // Nếu không có cả access token lẫn refresh token → không cần refresh (sẽ chuyển login)
  if (!accessToken) return false;

  return isTokenExpired() || isTokenExpiringSoon();
};

/**
 * Xóa tất cả tokens
 */
export const clearTokens = (): void => {
  Cookies.remove(CookieKey.ACCESS_TOKEN);
  Cookies.remove(CookieKey.REFRESH_TOKEN);
  Cookies.remove(CookieKey.ACCESS_TOKEN_EXPIRY);
};
