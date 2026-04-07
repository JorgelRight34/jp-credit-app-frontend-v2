import { CacheKey } from "@/models";
import { profilesQueryKey } from "./constants";

export const buildProfileKey = (id: number | string): CacheKey => [profilesQueryKey, +id] as const;

export const buildProfileChangeHistoryKey = (id: number): CacheKey => [profilesQueryKey, id, "ch"]