import { PermissionsProvider } from "@/models/permissionsProvider";
import { PERMISSIONS_ENDPOINT_SUFFIX } from "../../../utils/constants";
import { getUserModulePermissions } from "../services/userService";
import { CacheKey } from "@/models";

export const permissionsQueryKey: CacheKey = ["permissions"];

export const usersModulePermissionsEndpoint = "users" + PERMISSIONS_ENDPOINT_SUFFIX

export const usersQueryKey: CacheKey = ["users"]

export const usersModuleRootPath = "/access-control"

export const userModulePermissionsProvider: PermissionsProvider = {
    getPermissions: getUserModulePermissions,
    cacheKey: usersQueryKey
}