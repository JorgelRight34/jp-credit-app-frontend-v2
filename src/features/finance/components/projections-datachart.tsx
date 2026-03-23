import FinancialBreakdownDataChart from './financial-breakdown-datachart'
import { getProjectedIncomes } from '../services/financeService'
import { financeChartSearchConfig } from '../lib/config/finance-search-config'
import { PropsWithInitialQuery } from '@/components'
import { FinanceQuery } from '../models/financeQuery'
import { buildProjectionsSummariesQueryKey } from '../lib/query-keys'
import { financeInitialQuery } from '../lib/constants'

const ProjectionsDataChart = ({
  initialQuery,
}: PropsWithInitialQuery<FinanceQuery>) => {
  return (
    <FinancialBreakdownDataChart
      searchConfig={financeChartSearchConfig}
      initialQuery={{
        ...financeInitialQuery,
        chart: 'bar',
        ...initialQuery,
      }}
      buildDataOptions={(query) => ({
        key: buildProjectionsSummariesQueryKey(query),
        loader: () => getProjectedIncomes(query),
      })}
    />
  )
}

export default ProjectionsDataChart
