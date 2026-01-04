import { DASHBOARD, FEEMANAGEMENT, HOME } from "@/constants/route.constant";
import { IMapping } from "@/types/permission.type";

/**
 * Route-to-Permission mapping
 * - permission: null = public route (no permission required)
 * - permission: string = specific permission required
 */
export const MappingRouterPermission: IMapping[] = [
  // Public routes (no permission required)
  { pathName: [HOME], permission: null },

  // Protected routes
  { pathName: [DASHBOARD], permission: "123" }, // Must match nav-config.ts

  // Protected routes
  { pathName: [FEEMANAGEMENT], permission: "EWALLET:FEE:VIEW" },
];
