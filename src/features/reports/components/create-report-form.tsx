import {
  DataModuleFormProps,
  FileAttachmentsForm,
  FileAttachmentsPanel,
  Form,
  FormContainer,
  FormGroup,
  FormMasterDetailLayout,
  FormRow,
  FormSelectGroup,
  FormWatch,
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
import { reportKeySelectOptions } from '../lib/constants'

interface CreateReportFormProps extends DataModuleFormProps<
  Report,
  ReportFormValues
> {}

const CreateReportForm = ({
  defaultValues,
  ...props
}: CreateReportFormProps) => {
  const fileAttachmentsForm = useReportFileAttachmentForm()
  const form = useReportForm({
    defaultValues: {
      title: '',
      description: '',
      key: '',
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
          <FormMasterDetailLayout>
            <FormMasterDetailLayout.Master>
              <Form form={form}>
                <FormRow>
                  <FormGroup name="title" label="Título" input={Input} />
                </FormRow>
                <FormRow>
                  <FormSelectGroup
                    name="key"
                    label="Categoría"
                    options={reportKeySelectOptions}
                    disabled={!!defaultValues?.key}
                  />
                </FormRow>
                <FormGroup
                  name="description"
                  label="Descripción"
                  input={RichTextEditor}
                  optional
                />
              </Form>
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
