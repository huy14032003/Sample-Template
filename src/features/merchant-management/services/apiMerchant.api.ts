import { merchantApiService } from "@/stores/api/baseApi";

export const apiMerchant = merchantApiService.injectEndpoints({
    endpoints: (build) => ({
        getMerchant: build.query({
            query: (params) => ({
                url: "/merchants",
                method: "GET",
                params:params,
            }),
            providesTags: ["Merchant"],
        }),
    }),
    overrideExisting: false,
})
export const {
    useGetMerchantQuery
} = apiMerchant