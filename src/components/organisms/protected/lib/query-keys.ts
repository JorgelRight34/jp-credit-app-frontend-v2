import type { PermissionsProvider } from "../models/permissionsProvider"
import type { CacheKey } from "@/models"
import { permissionsQueryKey } from "@/features/auth"

export const createPermissionQueryKey = (provider: PermissionsProvider): CacheKey => {
    return [permissionsQueryKey, ...provider.cacheKey];
}