import {
  DataModuleFormProps,
  Form,
  FormContainer,
  MasterDetailLayout,
  FormReadOnlyGroup,
  FormRow,
  FormGroup,
  FormHtmlDisplayGroup,
} from '@/components'
import { Report } from '../models/report'
import { downloadFile } from '@/lib/utils'
import {
  ReportGenerationFormValues,
  useReportGenerationForm,
} from '../hooks/useReportGenerationForm'
import ReportTemplateDefinitionFieldset from './report-template-fieldset'
import { reportTemplateKeysLabels } from '../lib/constants'
import { reportTemplateKeysInputMap } from '../lib/jsx-constants'

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
    reportKey: report.key,
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
