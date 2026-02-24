import { CacheKey } from "@/models";

export const createLoanQueryKey = (id: number): CacheKey => ["loans", id]