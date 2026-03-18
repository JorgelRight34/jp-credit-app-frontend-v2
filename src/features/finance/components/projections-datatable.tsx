import {
  GroupedTable,
  PropsWithInitialQuery,
  SearchFormContainer,
  SearchFormValueConsumer,
} from '@/components'
import {
  getTodayAsInputDate,
  getTodayWithDaysFromNow,
  toInputDate,
} from '@/lib/utils'
import { FinanceQuery } from '../models/financeQuery'
import { useGroupedProjections } from '../hooks/useGroupedProjections'
import { buildProjectionTableColumns } from '../lib/config/finance-datatable-config'
import { financeTableSearchConfig } from '../lib/config/finance-search-config'

const ProjectionsDataTable = ({
  initialQuery,
}: PropsWithInitialQuery<FinanceQuery>) => {
  return (
    <SearchFormContainer
      searchConfig={financeTableSearchConfig}
      initialQuery={{
        option: 1,
        startDate: getTodayAsInputDate(),
        endDate: toInputDate(getTodayWithDaysFromNow(30 * 12 * 6)),
        interval: 30,
        ...initialQuery,
      }}
    >
      <SearchFormValueConsumer<FinanceQuery>
        render={(query) => <ProjectionsGroupedTable query={query} />}
      />
    </SearchFormContainer>
  )
}

const ProjectionsGroupedTable = ({ query }: { query: FinanceQuery }) => {
  const { projections, period, periods, ...table } = useGroupedProjections({
    query,
    periodsOfMargin: 0,
  })

  return (
    <GroupedTable
      groupPageSize={10}
      data={projections?.items}
      columns={buildProjectionTableColumns(
        projections?.loansMap,
        period?.start,
        period?.end,
        query.interval,
      )}
      totalItems={periods.length}
      {...table}
    />
  )
}

export default ProjectionsDataTable
