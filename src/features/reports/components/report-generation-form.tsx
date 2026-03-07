import {
  DataModuleFormProps,
  Form,
  FormContainer,
  FormFileGroup,
  FormGroup,
  FormMasterDetailLayout,
  FormRow,
  FormSelectGroup,
  FormWatch,
} from '@/components'
import { useReportGenerationForm } from '../hooks/useReportGenerationForm'
import { ReportGenerationFormValues } from '../lib/schemas/reportGenerationFormSchema'
import {
  reportKeySelectOptions,
  reportTemplateKeysInputMap,
  reportTemplateKeysLabels,
} from '../lib/constants'
import { Report } from '../models/report'
import ReportTemplateDefinitionFieldset from './report-template-fieldset'

const ReportGenerationForm = (
  props: DataModuleFormProps<Blob, ReportGenerationFormValues>,
) => {
  const form = useReportGenerationForm({
    ...props,
    initialValues: { key: 'loan' },
  })

  return (
    <FormContainer form={form}>
      <FormMasterDetailLayout>
        <FormMasterDetailLayout.Master>
          <Form form={form}>
            <FormRow>
              <FormFileGroup name="file" label="Archivos" />
            </FormRow>
            <FormRow>
              <FormSelectGroup
                name="key"
                label="Categoría"
                options={reportKeySelectOptions}
              />
            </FormRow>
            <FormRow>
              <FormWatch
                form={form}
                names={['key']}
                render={([key]) => (
                  <FormGroup
                    name="id"
                    label={reportTemplateKeysLabels[key as Report['key']]}
                    input={reportTemplateKeysInputMap[key as Report['key']]}
                  />
                )}
              />
            </FormRow>
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
    </FormContainer>
  )
}

export default ReportGenerationForm
