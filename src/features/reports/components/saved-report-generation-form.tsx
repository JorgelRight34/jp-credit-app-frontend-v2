import {
  DataModuleFormProps,
  Form,
  FormContainer,
  FormGroup,
  FormHtmlDisplayGroup,
  FormMasterDetailLayout,
  FormReadOnlyGroup,
  FormRow,
  PickerInputElement,
} from '@/components'
import { Report } from '../models/report'
import {
  reportTemplateKeysInputMap,
  reportTemplateKeysLabels,
} from '../lib/constants'
import { downloadFile } from '@/lib/utils'
import { useReportGenerationForm } from '../hooks/useReportGenerationForm'
import ReportTemplateDefinitionFieldset from './report-template-fieldset'
import { ReportGenerationFormValues } from '../lib/schemas/reportGenerationFormSchema'

interface SavedReportGenerationFormProps extends DataModuleFormProps<
  Blob,
  ReportGenerationFormValues
> {
  report: Report
}

const SavedReportGenerationForm = ({
  report,
  initialValues,
  ...props
}: SavedReportGenerationFormProps) => {
  const form = useReportGenerationForm({
    report,
    onSuccess: downloadFile,
    initialValues,
    ...props,
  })

  return (
    <FormContainer form={form}>
      <Form form={form}>
        <FormMasterDetailLayout>
          <FormMasterDetailLayout.Master>
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
                input={
                  reportTemplateKeysInputMap[report.key] as PickerInputElement
                }
              />
            </FormRow>
            <FormHtmlDisplayGroup
              name="description"
              label="Descripción"
              value={report.description}
              optional
            />
          </FormMasterDetailLayout.Master>
          <FormMasterDetailLayout.Detail>
            <ReportTemplateDefinitionFieldset templateKey={report.key} />
          </FormMasterDetailLayout.Detail>
        </FormMasterDetailLayout>
      </Form>
    </FormContainer>
  )
}

export default SavedReportGenerationForm
