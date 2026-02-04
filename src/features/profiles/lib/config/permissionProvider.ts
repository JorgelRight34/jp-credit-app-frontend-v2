import { profilesQueryKey } from "../constants";
import type { PermissionsProvider } from "@/components";
import { getModulePermissions } from "@/features/auth/services/authService";

export const profilesPermissionProvider: PermissionsProvider = {
    cacheKey: [profilesQueryKey],
    loader: () => getModulePermissions("profiles/permissions")
}