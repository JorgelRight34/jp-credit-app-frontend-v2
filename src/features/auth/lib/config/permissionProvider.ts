import { getModulePermissions } from "../../services/authService";
import type { PermissionsProvider } from "@/models/permissionsProvider";

export const accessControlPermissionProvider: PermissionsProvider = {
    cacheKey: ["access-control"],
    loader: () => getModulePermissions("users/permissions")
}