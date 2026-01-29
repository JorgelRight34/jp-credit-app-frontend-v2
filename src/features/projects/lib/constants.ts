import { CacheKey } from "@/models";
import { PermissionsProvider } from "@/models/permissionsProvider";
import { projectsClient } from "../services/projectService";

export const projectsQueryKey: CacheKey = ["projects"];
export const projectsTag = "projects"

export const projectsPermissionProvider: PermissionsProvider = {
    getPermissions: projectsClient.getProjectsModulePermissions,
    cacheKey: projectsQueryKey
}