import {
  getTodayAsInputDate,
  getTodayWithDaysFromNow,
  toInputDate,
} from '@/lib/utils'
import FinancialBreakdownDataChart from './financial-breakdown-datachart'
import { getIncomes } from '../services/financeService'
import { transactionsQueryKey } from '@/features/transactions/lib/constants'
import { incomeChartSearchConfig } from '../lib/config/income-config'

const IncomesDataChart = () => {
  return (
    <FinancialBreakdownDataChart
      searchConfig={incomeChartSearchConfig}
      initialQuery={{
        option: 1,
        startDate: getTodayAsInputDate(),
        endDate: toInputDate(getTodayWithDaysFromNow(-30)),
        interval: 30,
        chart: 'bar',
      }}
      buildDataOptions={(query) => ({
        key: [
          transactionsQueryKey,
          'projections-summary-incomes',
          query.startDate,
          query.endDate,
          query.interval,
        ],
        loader: () => getIncomes(query),
      })}
    />
  )
}

export default IncomesDataChart
