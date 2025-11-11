import { useData } from "@/hooks/useData"
import { FinanceQuery } from "../models/financeQuery"
import { projectionsCacheKey } from "../lib/constants"
import { getProjectedIncomesByPeriod } from "../services/financeClient"

interface UseProjectedIncomesByPeriodProps {
    query: FinanceQuery
}

export const useProjectedIncomesByPeriod = ({ query }: UseProjectedIncomesByPeriodProps) => {
    const { data, isLoading, isError } = useData({
        key: [...projectionsCacheKey, "projected-incomes-by-period", ...Object.values(query)],
        getData: () => getProjectedIncomesByPeriod(query),
    })

    return { incomesByPeriod: data, isLoading, isError }
}

