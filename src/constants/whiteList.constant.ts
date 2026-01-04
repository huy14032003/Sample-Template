import { AUTHENTICATION, FEEMANAGEMENT } from "@/constants/route.constant";
import { WhiteListItem } from "@/types/fetchBaseQuery.type";

/**
 * - `pathname`: Current browser pathname
 * - `requestUrl`: API endpoint to match
 */
export const WHITE_LIST: WhiteListItem[] = [
  {
    pathname: FEEMANAGEMENT,
    apiEndPoint: "/fee/policies",
  },
  {
    pathname: AUTHENTICATION +'/login',
    apiEndPoint: "/auth/login",
  },
];
