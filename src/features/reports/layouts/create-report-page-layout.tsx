import { BreadcrumbSpec, CreateFormPageLayout } from '@/components'
import CreateReportForm from '../components/create-report-form'
import { CreateReportHandler, UploadFilesHandler } from '../models/handlers'
import { ReportTemplateDefinition } from '../models/reportTemplateDefinition'
import { reportsBreadcrumb } from './reports-page-layout'

interface CreateReportPageLayoutProps<T> {
  breadcrumb: BreadcrumbSpec
  templateDefinition: ReportTemplateDefinition<T>
  onUpload: UploadFilesHandler
  onSubmit: CreateReportHandler
}

const CreateReportPageLayout = <T,>({
  breadcrumb,
  ...config
}: CreateReportPageLayoutProps<T>) => {
  return (
    <CreateFormPageLayout
      title="Crear reporte"
      breadcrumbs={[breadcrumb, reportsBreadcrumb]}
    >
      <CreateReportForm {...config} />
    </CreateFormPageLayout>
  )
}

export default CreateReportPageLayout
