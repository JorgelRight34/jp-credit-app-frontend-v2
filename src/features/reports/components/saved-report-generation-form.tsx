import {
  DataModuleFormProps,
  Form,
  FormContainer,
  MasterDetailLayout,
  FormReadOnlyGroup,
  FormRow,
  FormGroup,
  FormHtmlDisplayGroup,
  InputElement,
} from '@/components'
import { Report } from '../models/report'
import { downloadFile } from '@/lib/utils'
import {
  ReportGenerationFormValues,
  useReportGenerationForm,
} from '../hooks/useReportGenerationForm'
import ReportTemplateDefinitionFieldset from './report-template-fieldset'
import { ReportTemplateDefinition } from '../models/reportTemplateDefinition'
import { GenerateReportHandler } from '../models/handlers'

interface SavedReportGenerationFormProps<T> extends DataModuleFormProps<
  Blob,
  ReportGenerationFormValues
> {
  templateDefinition: ReportTemplateDefinition<T>
  report: Report
  onSubmit: GenerateReportHandler
  searchInput: InputElement
}

const SavedReportGenerationForm = <T,>({
  report,
  initialValues,
  initializeAsDirty,
  templateDefinition,
  searchInput,
  ...props
}: SavedReportGenerationFormProps<T>) => {
  const form = useReportGenerationForm({
    report,
    initialValues,
    onSuccess: downloadFile,
    ...props,
  })

  return (
    <FormContainer form={form} initializeAsDirty={initializeAsDirty}>
      <Form form={form}>
        <MasterDetailLayout>
          <MasterDetailLayout.MasterExpanded>
            <FormRow>
              <FormReadOnlyGroup
                name="title"
                label="Título"
                value={report.title}
              />
            </FormRow>
            <FormRow>
              <FormGroup
                name="id"
                disabled={!!initialValues?.id}
                label={templateDefinition.label}
                input={searchInput}
              />
            </FormRow>
            <FormHtmlDisplayGroup
              name="description"
              label="Descripción"
              value={report.description}
              optional
            />
          </MasterDetailLayout.MasterExpanded>
          <MasterDetailLayout.Detail>
            <ReportTemplateDefinitionFieldset
              templateDefinition={templateDefinition}
            />
          </MasterDetailLayout.Detail>
        </MasterDetailLayout>
      </Form>
    </FormContainer>
  )
}

export default SavedReportGenerationForm
