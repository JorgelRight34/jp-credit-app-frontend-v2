import { CacheKey } from "@/models";
import { Transaction } from "../models/transaction";
import { transactionsQueryKey } from "./constants";

export const createTransactionQueryKey = (id: Transaction["id"]): CacheKey => {
    return [transactionsQueryKey, id]
}

export const createCurrentAccountingPeriodQueryKey = (): CacheKey => [transactionsQueryKey, "current"]