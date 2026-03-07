import {
  DataModuleFormProps,
  FileAttachmentsForm,
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

interface CreateReportFormProps extends DataModuleFormProps<
  Report,
  ReportFormValues
> {}

const CreateReportForm = (props: CreateReportFormProps) => {
  const fileAttachmentsForm = useReportFileAttachmentForm()
  const form = useReportForm({
    ...props,
    initialValues: { title: '', description: '', key: '', bookmark: true },
    resetValues: true,
    onSuccess: fileAttachmentsForm.submit,
  })

  return (
    <FormContainer form={form}>
      <Tabs>
        <Tab eventKey="form" title="Datos">
          <FormMasterDetailLayout>
            <FormMasterDetailLayout.Master>
              <Form form={form}>
                <ReportFormPanel />
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
