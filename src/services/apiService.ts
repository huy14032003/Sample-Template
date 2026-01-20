import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ENV } from "@/constants/env.constant";
import { CookieKey } from "@/constants/fetchBaseCustom.constant";
import Cookies from "js-cookie";

export const baseQueryCustom = fetchBaseQuery({
  baseUrl: ENV.API_LOGIN,
  credentials: "include",
  prepareHeaders: (headers) => {
    const accessToken = Cookies.get(CookieKey.ACCESS_TOKEN);
    if (accessToken) {
      headers.set("authorization", `Bearer ${accessToken}`);
    }
    return headers;
  },
});
export const feeBaseQueryCustom = fetchBaseQuery({
  baseUrl: ENV.API_FEE,
  credentials: "include",
  prepareHeaders: (headers) => {
    const accessToken = Cookies.get(CookieKey.ACCESS_TOKEN);
    if (accessToken) {
      headers.set("authorization", `Bearer ${accessToken}`);
    }
    return headers;
  },
});

export const baseRefreshQuery = fetchBaseQuery({
  baseUrl: ENV.API_LOGIN,
  credentials: "include",
});

export const baseMerchantQuery = fetchBaseQuery({
  baseUrl: ENV.API_MERCHANR,
  credentials: "include",
  prepareHeaders: (headers) => {
    const accessToken = Cookies.get(CookieKey.ACCESS_TOKEN);
    if (accessToken) {
      headers.set("authorization", `Bearer ${accessToken}`);
    }
    return headers;
  },
})
