import {
  BreadcrumbSpec,
  CreateFormPageLayout,
  PermissionsProvider,
} from '@/components'
import CreateReportForm from '../components/create-report-form'
import { PropsWithReportKey } from '../models/report'
import { reportsBreadcrumb } from './reports-page-layout'

interface CreateReportPageLayoutProps extends PropsWithReportKey {
  permissionProvider: PermissionsProvider
  breadcrumb: BreadcrumbSpec
}

const CreateReportPageLayout = ({
  reportKey,
  breadcrumb,
  permissionProvider,
}: CreateReportPageLayoutProps) => {
  return (
    <CreateFormPageLayout
      title="Crear reporte"
      breadcrumbs={[reportsBreadcrumb, breadcrumb]}
      permissionProvider={permissionProvider}
    >
      <CreateReportForm reportKey={reportKey} />
    </CreateFormPageLayout>
  )
}

export default CreateReportPageLayout
