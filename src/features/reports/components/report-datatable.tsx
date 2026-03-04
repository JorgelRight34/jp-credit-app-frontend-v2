import { DataTableContainer, DataTableContainerOverrides } from '@/components'
import { reportSearchConfig } from '../lib/config/report-search-config'
import { reportDataTableConfig } from '../lib/config/report-datatable-config'
import { reporstQueryKey } from '../lib/query-keys'
import { ReportQuery } from '../models/reportQuery'
import { Report } from '../models/report'

const ReportDataTable = (
  props: DataTableContainerOverrides<Report, ReportQuery>,
) => {
  return (
    <DataTableContainer
      searchConfig={reportSearchConfig}
      datatableConfig={reportDataTableConfig}
      cacheKey={[reporstQueryKey]}
      {...props}
    />
  )
}

export default ReportDataTable
