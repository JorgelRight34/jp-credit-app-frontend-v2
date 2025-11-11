import { ModulePermissions } from "@/features/Auth/models/modulePermissions"
import { CacheKey } from "./cacheKey";

export type PermissionsProvider = {
    getPermissions: () => Promise<ModulePermissions>;
    cacheKey: CacheKey;
}