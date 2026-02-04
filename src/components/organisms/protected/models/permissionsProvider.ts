import type { ModulePermissions } from "./modulePermissions";
import type { CacheKey } from "@/models";

export type PermissionsProvider = {
    cacheKey: CacheKey;
    loader: () => Promise<ModulePermissions>;
}