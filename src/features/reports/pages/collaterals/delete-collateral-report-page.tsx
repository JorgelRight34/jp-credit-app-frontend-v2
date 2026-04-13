import { collateralsBreadcrumb } from '@/features/collaterals'
import DeleteReportPageLayout, {
  DeleteReportPageProps,
} from '../../layouts/delete-report-page-layout'
import { deleteCollateralReport } from '../../services/reportsClient'

const DeleteCollateralReportPage = ({ report }: DeleteReportPageProps) => (
  <DeleteReportPageLayout
    breadcrumb={collateralsBreadcrumb}
    report={report}
    onDelete={deleteCollateralReport}
  />
)

export default DeleteCollateralReportPage
