import { profilesQueryKey } from "./constants";

export const createProfileKey = (id: number) => [profilesQueryKey, id] as const;