import { DataTableContainer, DataTableContainerOverrides } from '@/components'
import { ChangeLogQuery } from '../models/changeLogQuery'
import { ChangeLog } from '../models/changeLog'
import { CacheKey, PagedResponse } from '@/models'
import { changeLogDataTableColumns } from '../lib/config/change-log-datatable-config'
import { changeLogSearchFormConfig } from '../lib/config/change-log-search-config'

interface EntityChangeLogDataTableProps extends DataTableContainerOverrides<
  ChangeLog,
  ChangeLogQuery
> {
  cacheKey: CacheKey
  loader: (query: ChangeLogQuery) => Promise<PagedResponse<ChangeLog>>
}

const EntityChangeLogDataTable = ({
  cacheKey,
  loader,
  ...props
}: EntityChangeLogDataTableProps) => {
  return (
    <DataTableContainer
      searchConfig={changeLogSearchFormConfig}
      datatableConfig={{ columns: changeLogDataTableColumns, loader }}
      cacheKey={cacheKey}
      {...props}
    />
  )
}

export default EntityChangeLogDataTable
