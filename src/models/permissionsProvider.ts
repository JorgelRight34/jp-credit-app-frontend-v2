import type { ModulePermissions } from "@/features/auth";
import type { CacheKey } from "./cacheKey";

export type PermissionsProvider = {
    cacheKey: CacheKey;
    loader: () => Promise<ModulePermissions>;
}