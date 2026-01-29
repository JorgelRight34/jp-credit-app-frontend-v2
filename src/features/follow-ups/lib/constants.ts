import { CacheKey } from "@/models";
import { PERMISSIONS_ENDPOINT_SUFFIX } from "@/lib/utils/constants";


export const followUpsCacheKey: CacheKey = ["follow-ups"];

export const followUpModulePermissionsEndpoint = "follow-ups" + PERMISSIONS_ENDPOINT_SUFFIX
export const followUpsTag = "follow-up"