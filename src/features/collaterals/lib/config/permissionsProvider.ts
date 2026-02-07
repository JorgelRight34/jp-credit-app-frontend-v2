import { collateralsQueryKey } from "../constants";
import type { PermissionsProvider } from "@/components";
import { getModulePermissions } from "@/features/auth";

export const collateralsPermissionProvider: PermissionsProvider = {
    cacheKey: [collateralsQueryKey],
    loader: () => getModulePermissions("collaterals/permissions")
}