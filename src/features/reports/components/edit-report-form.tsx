import {
  DataModuleFormProps,
  FileAttachmentsFormContainer,
  FileAttachmentsPanel,
  Form,
  FormContainer,
  FormMasterDetailLayout,
  FormWatch,
  Tab,
  TabPanel,
  Tabs,
  TabsList,
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
      key: report.key,
    },
    shouldEdit: true,
  })

  return (
    <Tabs>
      <TabsList>
        <Tab index={0}>Datos</Tab>
        <Tab index={1}>Archivos</Tab>
      </TabsList>
      <TabPanel index={0}>
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
      </TabPanel>
      <TabPanel index={1}>
        <EditReportFormFiles report={report} />
      </TabPanel>
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
