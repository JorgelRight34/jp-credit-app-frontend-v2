import { DataTableContainer, DataTableContainerOverrides } from '@/components'
import { ClosedPeriod } from '../models/accountingPeriod'
import { ClosedPeriodQuery } from '../models/closedPeriodQuery'
import { closedPeriodsSearchConfig } from '../lib/config/closed-periods-search-config'
import { closedPeriodsDataTableConfig } from '../lib/config/closed-periods-datatable-config'
import { accountingPeriodsQueryKey } from '../lib/constants'

const ClosedPeriodDataTable = (
  props: DataTableContainerOverrides<ClosedPeriod, ClosedPeriodQuery>,
) => {
  return (
    <DataTableContainer
      searchConfig={closedPeriodsSearchConfig}
      datatableConfig={closedPeriodsDataTableConfig}
      cacheKey={[accountingPeriodsQueryKey]}
      {...props}
    />
  )
}

export default ClosedPeriodDataTable
