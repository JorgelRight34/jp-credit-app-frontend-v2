import { profilesQueryKey } from "./constants";

export const createProfileKey = (id: number | string) => [profilesQueryKey, +id] as const;