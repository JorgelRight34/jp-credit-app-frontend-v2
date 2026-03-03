import { SearchFormConfig } from "@/components"
import { FinanceQuery } from "../../models/financeQuery"
import { financeBaseAdvancedOptions, financeBaseOptions } from "./finance-search-config"
import { exportExpenses } from "../../services/financeService"

export const expenseTableSearchConfig: SearchFormConfig<FinanceQuery> = {
    options: financeBaseOptions,
    advanced: [],
    onExport: exportExpenses
}

export const expenseChartSearchConfig: SearchFormConfig<FinanceQuery> = {
    options: financeBaseOptions,
    advanced: financeBaseAdvancedOptions,
    onExport: exportExpenses
}
