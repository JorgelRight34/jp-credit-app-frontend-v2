import {
  DataModuleFormProps,
  Form,
  FormContainer,
  FormFileGroup,
  FormGroup,
  MasterDetailLayout,
  FormRow,
  Input,
  InputElement,
} from '@/components'
import {
  ReportGenerationFormValues,
  useReportGenerationForm,
} from '../hooks/useReportGenerationForm'
import ReportTemplateDefinitionFieldset from './report-template-fieldset'
import { downloadFile } from '@/lib/utils'
import { GenerateReportHandler } from '../models/handlers'
import { ReportTemplateDefinition } from '../models/reportTemplateDefinition'

interface ReportGenerationFormProps<T> extends DataModuleFormProps<
  Blob,
  ReportGenerationFormValues
> {
  templateDefinition: ReportTemplateDefinition<T>
  onSubmit: GenerateReportHandler
  searchInput: InputElement
}

const ReportGenerationForm = <T,>({
  templateDefinition,
  searchInput: SearchInput,
  ...props
}: ReportGenerationFormProps<T>) => {
  const form = useReportGenerationForm({
    ...props,
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
                label={templateDefinition.label}
                input={SearchInput}
              />
            </FormRow>
          </Form>
        </MasterDetailLayout.Master>
        <MasterDetailLayout.Detail>
          <ReportTemplateDefinitionFieldset
            templateDefinition={templateDefinition}
          />
        </MasterDetailLayout.Detail>
      </MasterDetailLayout>
    </FormContainer>
  )
}

export default ReportGenerationForm
