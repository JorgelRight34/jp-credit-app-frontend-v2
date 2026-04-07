import { DataTableContainer, DataTableContainerOverrides } from '@/components'
import { ChangeLogQuery } from '../models/changeLogQuery'
import { ChangeLog } from '../models/changeLog'
import { CacheKey, PagedResponse } from '@/models'
import { changeLogDataTableColumns } from '../lib/config/change-log-datatable-config'
import { changeLogSearchFormConfig } from '../lib/config/change-log-search-config'
import HistoryChangesPreview from './history-changes-preview'

interface ChangeHistoryDataTableProps extends DataTableContainerOverrides<
  ChangeLog,
  ChangeLogQuery
> {
  cacheKey: CacheKey
  loader: (query: ChangeLogQuery) => Promise<PagedResponse<ChangeLog>>
}

const ChangeHistoryDataTable = ({
  cacheKey,
  loader,
  ...props
}: ChangeHistoryDataTableProps) => {
  return (
    <DataTableContainer
      searchConfig={changeLogSearchFormConfig}
      datatableConfig={{
        columns: changeLogDataTableColumns,
        allowExpand: true,
        loader,
        onExpand: HistoryChangesPreview,
      }}
      cacheKey={cacheKey}
      {...props}
    />
  )
}

export default ChangeHistoryDataTable
