import {
  DataModuleFormProps,
  Form,
  FormContainer,
  FormGroup,
  FormHtmlDisplayGroup,
  MasterDetailLayout,
  FormReadOnlyGroup,
  FormRow,
} from '@/components'
import { Report } from '../models/report'
import {
  reportTemplateKeysInputMap,
  reportTemplateKeysLabels,
} from '../lib/constants'
import { downloadFile } from '@/lib/utils'
import {
  ReportGenerationFormValues,
  useReportGenerationForm,
} from '../hooks/useReportGenerationForm'
import ReportTemplateDefinitionFieldset from './report-template-fieldset'

interface SavedReportGenerationFormProps extends DataModuleFormProps<
  Blob,
  ReportGenerationFormValues
> {
  report: Report
}

const SavedReportGenerationForm = ({
  report,
  initialValues,
  initializeAsDirty,
  ...props
}: SavedReportGenerationFormProps) => {
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
              <FormReadOnlyGroup
                name="key"
                label="Categoría"
                value={reportTemplateKeysLabels[report.key]}
              />
            </FormRow>
            <FormRow>
              <FormGroup
                name="id"
                disabled={!!initialValues?.id}
                label={reportTemplateKeysLabels[report.key]}
                input={reportTemplateKeysInputMap[report.key]}
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
            <ReportTemplateDefinitionFieldset templateKey={report.key} />
          </MasterDetailLayout.Detail>
        </MasterDetailLayout>
      </Form>
    </FormContainer>
  )
}

export default SavedReportGenerationForm
