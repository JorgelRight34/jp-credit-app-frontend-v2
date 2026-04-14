import { PermissionsProvider } from "@/components";
import { backgroundServiceQueryKey } from "./config/query-keys";
import { getModulePermissions } from "@/features/auth";

export const systemPermissionProvider: PermissionsProvider = {
    cacheKey: [backgroundServiceQueryKey],
    loader: async () => await getModulePermissions("background-service-configurations/permissions")
}