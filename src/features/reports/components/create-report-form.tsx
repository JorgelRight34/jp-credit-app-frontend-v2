import {
  DataModuleFormProps,
  FileAttachmentsForm,
  FileAttachmentsPanel,
  Form,
  FormContainer,
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

interface CreateReportFormProps extends DataModuleFormProps<
  Report,
  ReportFormValues
> {}

const CreateReportForm = (props: CreateReportFormProps) => {
  const fileAttachmentsForm = useReportFileAttachmentForm()
  const form = useReportForm({
    ...props,
    resetValues: true,
    onSuccess: fileAttachmentsForm.submit,
  })

  return (
    <FormContainer form={form}>
      <Tabs>
        <Tab eventKey="form" title="Datos">
          <div className="flex h-full">
            <div className="w-8/12">
              <Form form={form}>
                <ReportFormPanel />
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

export default CreateReportForm
