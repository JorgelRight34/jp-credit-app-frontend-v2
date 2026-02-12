import { PermissionsProvider } from "@/components";
import { projectsQueryKey } from "../constants";
import { getModulePermissions } from "@/features/auth";

export const projectsPermissionProvider: PermissionsProvider = {
    cacheKey: [projectsQueryKey],
    loader: () => getModulePermissions("projects/permissions")
}