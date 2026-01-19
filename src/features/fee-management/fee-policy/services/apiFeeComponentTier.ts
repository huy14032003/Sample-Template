import { apiFeeService } from "@/stores/api/baseApi"
import { ResponseType } from "@/types/api"

export const apiFeeComponentTier = apiFeeService.injectEndpoints({
  endpoints: (build) => ({
    postFeeComponentTier: build.mutation({
      query: (body) => ({
        url: `/fee/component-tiers`,
        method: 'POST',
        body: body
      }),
      invalidatesTags: ['feeComponentTier']
    }),
    getFeeComponentTier: build.query({
      query: (id) => ({
        url: `/fee/component-tiers/by-component/${id}`,
        method: 'GET',
      }),
      transformResponse: (res: ResponseType<any[]>) => res.data,
      providesTags: ['feeComponentTier']
    }),
   deleteFeeComponentTier: build.mutation({
      query: (id) => ({
        url: `/fee/component-tiers/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['feeComponentTier']
    }),
   putFeeComponentTier: build.mutation({
      query: ({body}) => ({
        url: `/fee/component-tiers`,
        method: 'PUT',
        body: body
      }),
      invalidatesTags: ['feeComponentTier']
    }),
  })
})
export const {
  usePostFeeComponentTierMutation,
  useGetFeeComponentTierQuery,
  useDeleteFeeComponentTierMutation,
  usePutFeeComponentTierMutation
} = apiFeeComponentTier