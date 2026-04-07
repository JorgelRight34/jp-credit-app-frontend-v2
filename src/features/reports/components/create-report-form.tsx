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

interface CreateReportFormProps extends DataModuleFormProps<
  Report,
  ReportFormValues
> {
  reportKey: Report['key']
}

const CreateReportForm = ({
  reportKey,
  defaultValues,
  ...props
}: CreateReportFormProps) => {
  const fileAttachmentsForm = useReportFileAttachmentForm()
  const form = useReportForm({
    defaultValues: {
      title: '',
      description: '',
      ...defaultValues,
    },
    reportKey,
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
              <ReportTemplateDefinitionFieldset templateKey={reportKey} />
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
