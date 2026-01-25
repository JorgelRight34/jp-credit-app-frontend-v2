import { useData } from "@/hooks/useData"
import { projectionsCacheKey } from "../lib/constants"
import { getProjectedIncomes } from "../services/financeClient"
import { FinanceQuery } from "../models/financeQuery"
import { dateToIsoString } from "@/utils"

interface UseProjectedIncomes {
    query: FinanceQuery
}

export const useProjectedIncomes = ({ query }: UseProjectedIncomes) => {
    const { data, isLoading, isError } = useData({
        key: [...projectionsCacheKey, "summary", dateToIsoString(query.start), dateToIsoString(query.end)],
        getData: () => getProjectedIncomes(query),
    })

    return { summary: data || { capital: 0, total: 0, interest: 0, fee: 0 }, isLoading, isError }
}