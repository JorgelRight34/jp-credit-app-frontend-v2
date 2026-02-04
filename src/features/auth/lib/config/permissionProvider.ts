import { getModulePermissions } from "../../services/authService";
import { rolesQueryKey } from "../constants";
import type { PermissionsProvider } from "@/components";

export const accessControlPermissionProvider: PermissionsProvider = {
  cacheKey: ["access-control"],
  loader: () => getModulePermissions("auth/users/permissions")
}

export const rolesPermissionProvider: PermissionsProvider = {
  cacheKey: [rolesQueryKey],
  loader: () => getModulePermissions("auth/roles/permissions")
}