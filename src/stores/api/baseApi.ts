import { fetchBaseQueryCustom, fetchBaseQueryFee, fetchBaseQueryMerchant } from "@/configs/fetchBaseQueryCustom";
import { createApi } from "@reduxjs/toolkit/query/react";

export const apiFeeService = createApi({
  baseQuery: fetchBaseQueryFee,
  tagTypes: [
    'FeePolicy',
  ],
  endpoints: () => ({}),
  refetchOnMountOrArgChange: true
})

export const authApiService = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQueryCustom,
  tagTypes: ['Auth', 'Dashboard'],
  endpoints: () => ({}),
  refetchOnMountOrArgChange: true
})

export const merchantApiService = createApi({
  reducerPath: 'merchantApi',
  baseQuery: fetchBaseQueryMerchant,
  tagTypes: ['Merchant'],
  endpoints: () => ({}),
  refetchOnMountOrArgChange: true
})


