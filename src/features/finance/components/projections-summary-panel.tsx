import {
  PropsWithInitialQuery,
  SearchFormContainer,
  SearchFormValueConsumer,
} from '@/components'
import { financeTableSearchConfig } from '../lib/config/finance-search-config'
import { FinanceQuery } from '../models/financeQuery'
import { useData } from '@/hooks/useData'
import { projectionsQueryKey } from '../lib/query-keys'
import { getProjectionSummary } from '../services/financeService'
import FinancialSummaryCards from './financial-summary-cards'
import { financeInitialQuery } from '../lib/constants'

const ProjectionsSummaryPanel = ({
  initialQuery,
}: PropsWithInitialQuery<FinanceQuery>) => {
  return (
    <SearchFormContainer
      searchConfig={financeTableSearchConfig}
      initialQuery={{
        ...financeInitialQuery,
        ...initialQuery,
      }}
    >
      <section className="py-6">
        <SearchFormValueConsumer<FinanceQuery>
          render={(query) => <ProjectionsSummary query={query} />}
        />
      </section>
    </SearchFormContainer>
  )
}

const ProjectionsSummary = ({ query }: { query: FinanceQuery }) => {
  const { data } = useData({
    key: [projectionsQueryKey, 'summary', { query }],
    loader: () => getProjectionSummary(query),
  })

  return (
    <FinancialSummaryCards
      className="flex-col gap-6 md:flex-row md:gap-12"
      capital={data?.capital ?? 0}
      interest={data?.interest ?? 0}
      fee={data?.fee ?? 0}
    />
  )
}

export default ProjectionsSummaryPanel
