import { authApiService } from "@/stores/api/baseApi";

export const authApi = authApiService.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),
    refreshToken: build.mutation<{ accessToken: string; refreshToken?: string }, { refreshToken: string }>({
      query: (body) => ({
        url: `/auth/refresh`,
        method: "POST",
        body: body,
      }),
    }),
    logout: build.mutation({
      query: (body) => ({
        url: "/auth/logout",
        method: "POST",
        body: body,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRefreshTokenMutation,
} = authApi;
