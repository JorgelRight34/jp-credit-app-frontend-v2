import {
  DataModuleFormProps,
  FileAttachmentsFormContainer,
  FileAttachmentsPanel,
  Form,
  FormContainer,
  FormMasterDetailLayout,
  FormWatch,
  Tab,
  Tabs,
} from '@/components'
import { useReportForm } from '../hooks/useReportForm'
import { Report } from '../models/report'
import ReportTemplateDefinitionFieldset from './report-template-fieldset'
import { useReportFileAttachmentForm } from '../hooks/useReportFileAttachmentForm'
import { ReportFormValues } from '../lib/schemas/reportFormSchema'
import ReportFormPanel from './report-form-panel'

interface EditReportFormProps extends DataModuleFormProps<
  Report,
  ReportFormValues
> {
  report: Report
}

const EditReportForm = ({ report, ...props }: EditReportFormProps) => {
  const form = useReportForm({
    ...props,
    initialValues: {
      title: report.title,
      description: report.description,
      bookmark: report.bookmark,
      key: report.key,
    },
    shouldEdit: true,
  })

  return (
    <Tabs>
      <Tab eventKey="form" title="Datos">
        <FormMasterDetailLayout>
          <FormMasterDetailLayout.Master>
            <FormContainer form={form}>
              <Form form={form}>
                <ReportFormPanel />
              </Form>
            </FormContainer>
          </FormMasterDetailLayout.Master>
          <FormMasterDetailLayout.Detail>
            <FormWatch
              form={form}
              names={['key']}
              render={([key]) => (
                <ReportTemplateDefinitionFieldset templateKey={key} />
              )}
            />
          </FormMasterDetailLayout.Detail>
        </FormMasterDetailLayout>
      </Tab>
      <Tab eventKey="files" title="Archivos">
        <EditReportFormFiles report={report} />
      </Tab>
    </Tabs>
  )
}

const EditReportFormFiles = ({
  report,
}: Pick<EditReportFormProps, 'report'>) => {
  const fileAttachmentsForm = useReportFileAttachmentForm({
    report,
  })

  return (
    <FileAttachmentsFormContainer
      form={fileAttachmentsForm}
      render={FileAttachmentsPanel}
    />
  )
}
export default EditReportForm
