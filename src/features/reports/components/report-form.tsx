import {
  DataModuleFormProps,
  FileAttachmentsForm,
  FileAttachmentsPanel,
  Form,
  FormCheckboxGroup,
  FormContainer,
  FormGroup,
  FormRow,
  FormSelectGroup,
  FormWatch,
  Input,
  RichTextEditor,
  SelectOptions,
  Tab,
  Tabs,
} from '@/components'
import { useReportForm } from '../hooks/useReportForm'
import { Report } from '../models/report'
import ReportTemplateDefinitionFieldset from './report-template-fieldset'
import { useReportFileAttachmentForm } from '../hooks/useReportFileAttachmentForm'
import { ReportFormValues } from '../lib/schemas/reportFormSchema'

interface ReportFormProps extends DataModuleFormProps<
  Report,
  ReportFormValues
> {
  report?: Report
}

const ReportForm = ({ report, ...props }: ReportFormProps) => {
  const fileAttachmentsForm = useReportFileAttachmentForm()
  const form = useReportForm({
    ...props,
    shouldEdit: !!report,
    onSuccess: fileAttachmentsForm.submit,
  })

  return (
    <FormContainer form={form}>
      <Tabs>
        <Tab eventKey="form" title="Datos">
          <div className="flex h-full">
            <div className="w-8/12">
              <Form form={form}>
                <FormRow>
                  <FormGroup name="title" label="Título" input={Input} />
                </FormRow>
                <FormRow>
                  <FormSelectGroup
                    name="key"
                    label="Categoría"
                    options={
                      [['loan', 'Préstamos']] as SelectOptions<Report['key']>
                    }
                  />

                  <FormCheckboxGroup name="bookmark" label="Marcar" />
                </FormRow>
                <FormGroup
                  name="description"
                  label="Descripción"
                  input={RichTextEditor}
                  optional
                />
              </Form>
            </div>
            <div className="flex h-full flex-col w-4/12 pl-6">
              <FormWatch
                form={form}
                names={['key']}
                render={([key]) => (
                  <ReportTemplateDefinitionFieldset templateKey={key} />
                )}
              />
            </div>
          </div>
        </Tab>
        <Tab eventKey="files" title="Archivos">
          <FileAttachmentsForm
            ref={fileAttachmentsForm.formRef}
            form={fileAttachmentsForm.form}
            render={FileAttachmentsPanel}
          />
        </Tab>
      </Tabs>
    </FormContainer>
  )
}

export default ReportForm
