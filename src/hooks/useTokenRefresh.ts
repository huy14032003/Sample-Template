import { useEffect } from 'react';
import { shouldRefreshToken, getAccessToken } from '@/utils/tokenUtils';
import Cookies from 'js-cookie';
import { CookieKey } from '@/constants/fetchBaseCustom.constant';

/**
 * Hook để kiểm tra và refresh token khi app mount hoặc khi chuyển route
 * Đảm bảo token luôn valid trước khi user thực hiện bất kỳ action nào
 */
export const useTokenRefresh = () => {
  useEffect(() => {
    const checkAndRefreshToken = async () => {
      const token = getAccessToken();

      // Nếu không có token, không cần làm gì (user chưa login)
      if (!token) return;

      // Nếu token sắp hết hạn hoặc đã hết hạn
      if (shouldRefreshToken()) {
        try {
          const refreshToken = Cookies.get(CookieKey.REFRESH_TOKEN);
          if (!refreshToken) {
            // Không có refresh token, logout
            window.location.href = '/auth/login';
            return;
          }

          // Gọi API refresh token
          // Note: Logic refresh sẽ được handle bởi fetchBaseQueryCustom
          // khi có API call đầu tiên
          console.log('[TokenRefresh] Token needs refresh');
        } catch (error) {
          console.error('[TokenRefresh] Failed to refresh token:', error);
          // Nếu refresh fail, để cho fetchBaseQueryCustom handle
        }
      }
    };

    checkAndRefreshToken();
  }, []); // Chỉ chạy khi component mount

  return null;
};
