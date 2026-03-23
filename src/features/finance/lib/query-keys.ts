import { loansQueryKey } from "@/features/loans";
import { FinanceQuery } from "../models/financeQuery";

export const projectionsQueryKey = loansQueryKey
export const projectionsSummaryQueryKey = "summaries"

export const buildProjectionsSummariesQueryKey = (query: FinanceQuery) => [
    projectionsQueryKey,
    projectionsSummaryQueryKey,
    query.startDate,
    query.endDate,
    query.interval,
]