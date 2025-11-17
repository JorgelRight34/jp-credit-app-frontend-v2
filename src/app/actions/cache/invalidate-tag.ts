"use server";

import { revalidateTag } from "next/cache";
import { CacheLife } from "next/dist/server/use-cache/cache-life";

export async function invalidateTags(tags: string[] = [], profile: string | CacheLife = "max") {
    for (const tag of tags) {
        revalidateTag(tag, profile);
    }
}
