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
  const { projections, period, periods, groupMap, groups, ...table } =
    useGroupedProjections({ query })

  return (
    <>
      <GroupedTable
        data={groups}
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
        pageSize={1} // it should be periods of margin
        totalItems={periods.length}
        {...table}
      />
      {periods.length}
    </>
  )
}

export default ProjectionsDataTable
