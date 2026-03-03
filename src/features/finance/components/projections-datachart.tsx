import {
  getTodayAsInputDate,
  getTodayWithDaysFromNow,
  toInputDate,
} from '@/lib/utils'
import FinancialBreakdownDataChart from './financial-breakdown-datachart'
import { getProjectedIncomes } from '../services/financeService'
import { financeChartSearchConfig } from '../lib/config/finance-search-config'

const ProjectionsDataChart = () => {
  return (
    <FinancialBreakdownDataChart
      searchConfig={financeChartSearchConfig}
      initialQuery={{
        option: 1,
        startDate: getTodayAsInputDate(),
        endDate: toInputDate(getTodayWithDaysFromNow(30 * 12 * 6)),
        interval: 30,
        chart: 'bar',
      }}
      buildDataOptions={(query) => ({
        key: [
          'projections-summary',
          query.startDate,
          query.endDate,
          query.interval,
        ],
        loader: () => getProjectedIncomes(query),
      })}
    />
  )
}

export default ProjectionsDataChart
