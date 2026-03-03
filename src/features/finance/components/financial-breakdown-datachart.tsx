import {
  SearchFormConfig,
  SearchFormContainer,
  SearchFormValueConsumer,
} from '@/components'
import { FinanceQuery } from '../models/financeQuery'
import { useData } from '@/hooks/useData'
import FinancialBreakdownChart from './financial-breakdown-chart'
import { FinancialBreakdown } from '../models/financialBreakdown'
import { CacheKey } from '@/models'

interface FinancialBreakdownDataChartProps {
  initialQuery?: FinanceQuery
  searchConfig: SearchFormConfig<FinanceQuery>
  buildDataOptions: (query: FinanceQuery) => {
    key: CacheKey
    loader: () => Promise<Array<FinancialBreakdown>>
  }
}

const FinancialBreakdownDataChart = ({
  initialQuery,
  searchConfig,
  buildDataOptions,
}: FinancialBreakdownDataChartProps) => {
  return (
    <SearchFormContainer
      searchConfig={searchConfig}
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
}: Pick<FinancialBreakdownDataChartProps, 'buildDataOptions'> & {
  query: FinanceQuery
}) => {
  const { data } = useData(buildDataOptions(query))

  if (!data || !query.chart) return null

  return (
    <div className="flex justify-center h-96">
      <FinancialBreakdownChart data={data} type={query.chart} />
    </div>
  )
}

export default FinancialBreakdownDataChart
