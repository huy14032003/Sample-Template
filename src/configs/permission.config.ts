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

  { pathName: [DASHBOARD], permission: null}, // Must match nav-config.ts

  { pathName: [FEEMANAGEMENT], permission: "EWALLET:FEE:VIEW" },
];
