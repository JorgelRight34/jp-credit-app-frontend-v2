import { CacheKey } from "@/models";

export const loansQueryKey = "loans"

export const loanPurposesQueryKey = "purposes"

export const buildLoanQueryKey = (id: number): CacheKey => [loansQueryKey, id]

export const buildLoanPurposeQueryKey = (id: number): CacheKey => [loanPurposesQueryKey, id]

export const buildLoanChangeHistoryKey = (id: number): CacheKey => [loansQueryKey, id, "ch"]