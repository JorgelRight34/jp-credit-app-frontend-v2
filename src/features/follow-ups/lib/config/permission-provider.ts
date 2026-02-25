import { PermissionsProvider } from "@/components";
import { followUpsQueryKey } from "../query-keys";
import { getModulePermissions } from "@/features/auth";

export const followUpPermissionProvider: PermissionsProvider = {
    cacheKey: [followUpsQueryKey],
    loader: () => getModulePermissions("follow-ups/permissions")
}