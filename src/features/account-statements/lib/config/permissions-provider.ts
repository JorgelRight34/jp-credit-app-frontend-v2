import { PermissionsProvider } from "@/components";
import { getModulePermissions } from "@/features/auth";

export const accountStatementsPermissionProvider: PermissionsProvider = {
    cacheKey: ["transactions"],
    loader: () => getModulePermissions("transactions/permissions")
}
