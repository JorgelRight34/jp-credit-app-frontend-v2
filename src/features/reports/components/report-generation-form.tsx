import {
  DataModuleFormProps,
  Form,
  FormContainer,
  FormFileGroup,
  FormGroup,
  MasterDetailLayout,
  FormRow,
  FormWatch,
  Input,
} from '@/components'
import {
  ReportGenerationFormValues,
  useReportGenerationForm,
} from '../hooks/useReportGenerationForm'
import { Report } from '../models/report'
import ReportTemplateDefinitionFieldset from './report-template-fieldset'
import { downloadFile } from '@/lib/utils'
import { reportTemplateKeysLabels } from '../lib/constants'
import { reportTemplateKeysInputMap } from '../lib/jsx-constants'

interface ReportGenerationFormProps extends DataModuleFormProps<
  Blob,
  ReportGenerationFormValues
> {
  reportKey: Report['key']
}

const ReportGenerationForm = ({
  reportKey,
  ...props
}: ReportGenerationFormProps) => {
  const form = useReportGenerationForm({
    ...props,
    reportKey,
    onSuccess: downloadFile,
  })

  return (
    <FormContainer form={form}>
      <MasterDetailLayout>
        <MasterDetailLayout.Master>
          <Form form={form}>
            <FormRow>
              <FormFileGroup
                name="file"
                accept=".pdf,.docx"
                label="Archivos"
                multiple
              />
            </FormRow>
            <FormRow>
              <FormGroup name="url" label="Enlace" input={Input} />
            </FormRow>
            <FormRow>
              <FormGroup
                name="id"
                label={reportTemplateKeysLabels[reportKey]}
                input={reportTemplateKeysInputMap[reportKey]}
              />
            </FormRow>
          </Form>
        </MasterDetailLayout.Master>
        <MasterDetailLayout.Detail>
          <FormWatch
            form={form}
            names={['key']}
            render={([key]) => (
              <ReportTemplateDefinitionFieldset templateKey={key} />
            )}
          />
        </MasterDetailLayout.Detail>
      </MasterDetailLayout>
    </FormContainer>
  )
}

export default ReportGenerationForm
