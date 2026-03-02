import { SearchFormContainer, SearchFormValueConsumer } from '@/components'
import { financeChartSearchConfig } from '../lib/config/finance-search-config'
import { FinanceQuery } from '../models/financeQuery'
import { useData } from '@/hooks/useData'
import FinancialBreakdownChart from './financial-breakdown-chart'
import { FinancialBreakdown } from '../models/financialBreakdown'
import { CacheKey } from '@/models'

interface FinancialBreakdownDataChartProps {
  initialQuery?: Partial<FinanceQuery>
  buildDataOptions: (query: FinanceQuery) => {
    key: CacheKey
    loader: () => Promise<Array<FinancialBreakdown>>
  }
}

const FinancialBreakdownDataChart = ({
  initialQuery,
  buildDataOptions,
}: FinancialBreakdownDataChartProps) => {
  return (
    <SearchFormContainer
      searchConfig={financeChartSearchConfig}
      initialQuery={initialQuery}
    >
      <SearchFormValueConsumer<FinanceQuery>
        render={(query) => (
          <FinancialBreakdownChartContainer
            query={query}
            buildDataOptions={buildDataOptions}
          />
        )}
      />
    </SearchFormContainer>
  )
}

const FinancialBreakdownChartContainer = ({
  query,
  buildDataOptions,
}: FinancialBreakdownDataChartProps & { query: FinanceQuery }) => {
  const { data } = useData(buildDataOptions(query))

  if (!data || !query.chart) return null

  return (
    <div className="flex justify-center h-96">
      <FinancialBreakdownChart data={data} type={query.chart} />
    </div>
  )
}

export default FinancialBreakdownDataChart
