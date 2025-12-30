import { baseQueryCustom } from "@/services/apiService";
import { createApi } from "@reduxjs/toolkit/query/react";

export const apiService = createApi({
  baseQuery: baseQueryCustom,
  tagTypes: [
    'customerService',
  ],
  endpoints: () => ({}),
  refetchOnMountOrArgChange: true
})

export const authApiService = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryCustom,
  tagTypes: ['Auth', 'Dashboard'],
  endpoints: () => ({}),
  refetchOnMountOrArgChange: true
})
