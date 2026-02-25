import { DataTableContainer, DataTableContainerOverrides } from '@/components'
import { followUpSearchConfig } from '../lib/config/follow-up-search-config'
import { followUpDataTableConfig } from '../lib/config/follow-up-datatable-config'
import { followUpsQueryKey } from '../lib/query-keys'
import { FollowUp } from '../models/followUp'
import { FollowUpQuery } from '../models/followUpQuery'

const FollowUpDataTable = (
  props: DataTableContainerOverrides<FollowUp, FollowUpQuery>,
) => {
  return (
    <DataTableContainer
      searchConfig={followUpSearchConfig}
      datatableConfig={followUpDataTableConfig}
      cacheKey={[followUpsQueryKey]}
      {...props}
    />
  )
}

export default FollowUpDataTable
