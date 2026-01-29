import { PermissionsProvider } from "@/models/permissionsProvider";
import { PERMISSIONS_ENDPOINT_SUFFIX } from "../../../lib/utils/constants";
import { getUserModulePermissions } from "../services/userClient";
import { CacheKey } from "@/models";

export const permissionsQueryKey: CacheKey = ["permissions"];

export const usersModulePermissionsEndpoint = "users" + PERMISSIONS_ENDPOINT_SUFFIX

export const usersQueryKey: CacheKey = ["users"]
export const usersTag = "users"

export const usersModuleRootPath = "/access-control"

export const userModulePermissionsProvider: PermissionsProvider = {
    getPermissions: getUserModulePermissions,
    cacheKey: usersQueryKey
}