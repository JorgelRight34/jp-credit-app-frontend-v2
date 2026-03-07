import {
  Form,
  FormContainer,
  FormGroup,
  FormHtmlDisplayGroup,
  FormMasterDetailLayout,
  FormReadOnlyGroup,
  FormRow,
  FormWatch,
} from '@/components'
import { Report } from '../models/report'
import {
  reportTemplateKeysInputMap,
  reportTemplateKeysLabels,
} from '../lib/constants'
import { downloadFile } from '@/lib/utils'
import { useReportGenerationForm } from '../hooks/useReportGenerationForm'
import ReportTemplateDefinitionFieldset from './report-template-fieldset'

const SavedReportGenerationForm = ({ report }: { report: Report }) => {
  const form = useReportGenerationForm({ report, onSuccess: downloadFile })

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
      </Form>
    </FormContainer>
  )
}

export default SavedReportGenerationForm
