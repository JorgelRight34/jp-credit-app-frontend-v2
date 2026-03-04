import { CreateFormPageLayout } from '@/components'
import { reportPermissionProvider } from '../lib/permission-provider'
import { reportsBreadcrumb } from './reports-page'
import CreateReportForm from '../components/create-report-form'

const CreateReportPage = () => {
  return (
    <CreateFormPageLayout
      title="Crear reporte"
      breadcrumbs={[reportsBreadcrumb]}
      permissionProvider={reportPermissionProvider}
    >
      <CreateReportForm />
    </CreateFormPageLayout>
  )
}

export default CreateReportPage
