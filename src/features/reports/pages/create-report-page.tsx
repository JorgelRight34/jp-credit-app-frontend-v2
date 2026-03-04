import { CreateFormPageLayout } from '@/components'
import { reportPermissionProvider } from '../lib/permission-provider'
import { reportsBreadcrumb } from './reports-page'
import ReportForm from '../components/report-form'

const CreateReportPage = () => {
  return (
    <CreateFormPageLayout
      title="Crear reporte"
      breadcrumbs={[reportsBreadcrumb]}
      permissionProvider={reportPermissionProvider}
    >
      <ReportForm />
    </CreateFormPageLayout>
  )
}

export default CreateReportPage
