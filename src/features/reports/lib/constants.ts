import { PermissionsProvider } from "@/models/permissionsProvider";
import { getReportsModulePermissions } from "../services/reportsClient";
import { CacheKey } from "@/models";

export const reportsCacheKey: CacheKey = ["reports"]

export const reportsModulePermissionsProvider: PermissionsProvider = {
    getPermissions: getReportsModulePermissions,
    cacheKey: reportsCacheKey
}