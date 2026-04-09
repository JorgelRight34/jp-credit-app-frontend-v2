import {
  BreadcrumbSpec,
  CreateFormPageLayout,
  PermissionsProvider,
} from '@/components'
import CreateReportForm from '../components/create-report-form'
import {
  CreateReportHandler,
  DeleteFilesHandler,
  UploadFilesHandler,
} from '../models/handlers'
import { ReportTemplateDefinition } from '../models/reportTemplateDefinition'
import { reportsBreadcrumb } from './reports-page-layout'

interface CreateReportPageLayoutProps<T> {
  permissionProvider: PermissionsProvider
  breadcrumb: BreadcrumbSpec
  templateDefinition: ReportTemplateDefinition<T>
  onUpload: UploadFilesHandler
  onDelete: DeleteFilesHandler
  onSubmit: CreateReportHandler
}

const CreateReportPageLayout = <T,>({
  breadcrumb,
  permissionProvider,
  ...config
}: CreateReportPageLayoutProps<T>) => {
  return (
    <CreateFormPageLayout
      title="Crear reporte"
      breadcrumbs={[breadcrumb, reportsBreadcrumb]}
      permissionProvider={permissionProvider}
    >
      <CreateReportForm {...config} />
    </CreateFormPageLayout>
  )
}

export default CreateReportPageLayout
