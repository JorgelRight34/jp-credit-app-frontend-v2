import {
  DataModuleFormProps,
  FileAttachmentsFormContainer,
  FileAttachmentsPanel,
  Form,
  FormContainer,
  FormGroup,
  MasterDetailLayout,
  FormRow,
  Input,
  RichTextEditor,
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
import {
  DeleteFilesHandler,
  EditReportHandler,
  UploadFilesHandler,
} from '../models/handlers'
import { ReportTemplateDefinition } from '../models/reportTemplateDefinition'

interface EditReportFormProps<T> extends DataModuleFormProps<
  Report,
  ReportFormValues
> {
  templateDefinition: ReportTemplateDefinition<T>
  report: Report
  onUpload: UploadFilesHandler
  onDelete: DeleteFilesHandler
  onEdit: EditReportHandler
}

const EditReportForm = <T,>({
  templateDefinition,
  report,
  onUpload,
  onDelete,
  ...props
}: EditReportFormProps<T>) => {
  const form = useReportForm({
    ...props,
    defaultValues: {
      title: report.title,
      description: report.description,
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
        <MasterDetailLayout>
          <MasterDetailLayout.MasterExpanded>
            <FormContainer form={form}>
              <Form form={form}>
                <FormRow>
                  <FormGroup name="title" label="Título" input={Input} />
                </FormRow>
                <FormGroup
                  name="description"
                  label="Descripción"
                  input={RichTextEditor}
                  optional
                />
              </Form>
            </FormContainer>
          </MasterDetailLayout.MasterExpanded>
          <MasterDetailLayout.Detail>
            <ReportTemplateDefinitionFieldset
              templateDefinition={templateDefinition}
            />
          </MasterDetailLayout.Detail>
        </MasterDetailLayout>
      </TabPanel>
      <TabPanel index={1}>
        <EditReportFormFiles
          onUpload={onUpload}
          onDelete={onDelete}
          report={report}
        />
      </TabPanel>
    </Tabs>
  )
}

const EditReportFormFiles = <T,>({
  report,
  onUpload,
  onDelete,
}: Pick<EditReportFormProps<T>, 'report' | 'onUpload' | 'onDelete'>) => {
  const fileAttachmentsForm = useReportFileAttachmentForm({
    report,
    onUpload,
    onDelete,
  })

  return (
    <FileAttachmentsFormContainer
      form={fileAttachmentsForm}
      render={FileAttachmentsPanel}
    />
  )
}
export default EditReportForm
