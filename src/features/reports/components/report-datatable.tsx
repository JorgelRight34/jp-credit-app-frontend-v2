import {
  DataTableContainer,
  DataTableContainerOverrides,
  Route,
} from '@/components'
import { reportSearchConfig } from '../lib/config/report-search-config'
import { reporstQueryKey } from '../lib/query-keys'
import { ReportQuery } from '../models/reportQuery'
import { Report } from '../models/report'
import { PagedResponse } from '@/models'
import { buildReportDataTableColumns } from '../lib/config/report-datatable-config'

export interface ReportDataTableProps extends DataTableContainerOverrides<
  Report,
  ReportQuery
> {
  reportPageRoute: Route
  loader: (query: ReportQuery) => Promise<PagedResponse<Report>>
}

const ReportDataTable = ({
  reportPageRoute,
  loader,
  ...props
}: ReportDataTableProps) => (
  <DataTableContainer
    searchConfig={reportSearchConfig}
    datatableConfig={{
      columns: buildReportDataTableColumns(reportPageRoute),
      loader,
    }}
    cacheKey={[reporstQueryKey]}
    {...props}
  />
)

export default ReportDataTable
