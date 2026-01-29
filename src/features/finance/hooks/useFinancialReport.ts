import { useData } from "@/hooks/useData"
import { getFinancialReport } from "../services/financeClient"
import { FinanceQuery } from "../models/financeQuery"

export const useFinancialReport = (query: FinanceQuery) => {
    const { data, isLoading, isError } = useData({
        key: ["finance", ...Object.values(query)],
        getData: () => getFinancialReport(query),
        keepPreviousData: true,
    })

    return { report: data, isLoading, isError }
}