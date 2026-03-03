import { SearchFormConfig } from "@/components"
import { FinanceQuery } from "../../models/financeQuery"
import { financeBaseAdvancedOptions, financeBaseOptions } from "./finance-search-config"
import { exportIncomes } from "../../services/financeService"

export const incomeTableSearchConfig: SearchFormConfig<FinanceQuery> = {
    options: financeBaseOptions,
    advanced: [],
    onExport: exportIncomes
}

export const incomeChartSearchConfig: SearchFormConfig<FinanceQuery> = {
    options: financeBaseOptions,
    advanced: financeBaseAdvancedOptions,
    onExport: exportIncomes
}
