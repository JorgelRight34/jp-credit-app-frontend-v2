import {
  DataModuleFormProps,
  FileAttachmentsForm,
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
import FormattersDefinitionPanel from './formatters-definition-panel'
import {
  CreateReportHandler,
  DeleteFilesHandler,
  UploadFilesHandler,
} from '../models/handlers'
import { ReportTemplateDefinition } from '../models/reportTemplateDefinition'

interface CreateReportFormProps<T> extends DataModuleFormProps<
  Report,
  ReportFormValues
> {
  templateDefinition: ReportTemplateDefinition<T>
  onUpload: UploadFilesHandler
  onDelete: DeleteFilesHandler
  onSubmit: CreateReportHandler
}

const CreateReportForm = <T,>({
  defaultValues,
  templateDefinition,
  onUpload,
  onDelete,
  ...props
}: CreateReportFormProps<T>) => {
  const fileAttachmentsForm = useReportFileAttachmentForm({
    onUpload,
    onDelete,
  })
  const form = useReportForm({
    defaultValues: {
      title: '',
      description: '',
      ...defaultValues,
    },
    resetValues: true,
    onSuccess: fileAttachmentsForm.submit,
    ...props,
  })

  return (
    <FormContainer form={form}>
      <Tabs>
        <TabsList>
          <Tab index={0}>Datos</Tab>
          <Tab index={1}>Archivos</Tab>
          <Tab index={2}>Formatos</Tab>
        </TabsList>
        <TabPanel index={0}>
          <MasterDetailLayout>
            <MasterDetailLayout.MasterExpanded>
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
            </MasterDetailLayout.MasterExpanded>
            <MasterDetailLayout.Detail>
              <ReportTemplateDefinitionFieldset
                templateDefinition={templateDefinition}
              />
            </MasterDetailLayout.Detail>
          </MasterDetailLayout>
        </TabPanel>
        <TabPanel index={1}>
          <FileAttachmentsForm
            ref={fileAttachmentsForm.formRef}
            form={fileAttachmentsForm.form}
            render={FileAttachmentsPanel}
          />
        </TabPanel>
        <TabPanel index={2}>
          <FormattersDefinitionPanel />
        </TabPanel>
      </Tabs>
    </FormContainer>
  )
}

export default CreateReportForm
