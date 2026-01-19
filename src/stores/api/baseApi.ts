import { fetchBaseQueryCustom, fetchBaseQueryFee } from "@/configs/fetchBaseQueryCustom";
import { createApi } from "@reduxjs/toolkit/query/react";

export const apiFeeService = createApi({
  reducerPath: 'feeApi',
  baseQuery: fetchBaseQueryFee,
  tagTypes: [
    'FeePolicy',
    'FeePolicyComponent',
    'feeComponentTier',
    'feeAssign',
    'feeBank'

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
