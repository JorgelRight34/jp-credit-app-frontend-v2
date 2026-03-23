import {
  GroupedTable,
  PropsWithInitialQuery,
  SearchFormContainer,
  SearchFormValueConsumer,
} from '@/components'
import { FinanceQuery } from '../models/financeQuery'
import { useGroupedProjections } from '../hooks/useGroupedProjections'
import { buildProjectionTableColumns } from '../lib/config/finance-datatable-config'
import { financeTableSearchConfig } from '../lib/config/finance-search-config'
import { financeInitialQuery } from '../lib/constants'

const ProjectionsDataTable = ({
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
      <SearchFormValueConsumer<FinanceQuery>
        render={(query) => <ProjectionsGroupedTable query={query} />}
      />
    </SearchFormContainer>
  )
}

const ProjectionsGroupedTable = ({ query }: { query: FinanceQuery }) => {
  const { projections, period, periods, groupMap, ...table } =
    useGroupedProjections({
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
      getGroupColumns={(_, index) =>
        buildProjectionTableColumns(
          projections?.loansMap,
          groupMap[index],
          groupMap[index],
          query.interval,
        )
      }
      totalItems={periods.length}
      {...table}
    />
  )
}

export default ProjectionsDataTable
