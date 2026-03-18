import {
  getTodayAsInputDate,
  getTodayWithDaysFromNow,
  toInputDate,
} from '@/lib/utils'
import FinancialBreakdownDataChart from './financial-breakdown-datachart'
import { getExpenses } from '../services/financeService'
import { transactionsQueryKey } from '@/features/transactions/lib/constants'
import { expenseChartSearchConfig } from '../lib/config/expense-config'
import { PropsWithInitialQuery } from '@/components'
import { FinanceQuery } from '../models/financeQuery'

const ExpensesDataChart = ({
  initialQuery,
}: PropsWithInitialQuery<FinanceQuery>) => {
  return (
    <FinancialBreakdownDataChart
      searchConfig={expenseChartSearchConfig}
      initialQuery={{
        option: 1,
        startDate: getTodayAsInputDate(),
        endDate: toInputDate(getTodayWithDaysFromNow(-30)),
        interval: 30,
        chart: 'bar',
        ...initialQuery,
      }}
      buildDataOptions={(query) => ({
        key: [
          transactionsQueryKey,
          'projections-summary-expenses',
          query.startDate,
          query.endDate,
          query.interval,
        ],
        loader: () => getExpenses(query),
      })}
    />
  )
}

export default ExpensesDataChart
