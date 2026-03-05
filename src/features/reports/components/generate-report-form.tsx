import {
  Form,
  FormContainer,
  FormGroup,
  FormHtmlDisplayGroup,
  FormReadOnlyGroup,
  FormRow,
  InputElement,
} from '@/components'
import { Report } from '../models/report'
import { reportTemplateKeysLabels } from '../lib/constants'
import { LoanSearchInput } from '@/features/loans'
import { useGenerateReportForm } from '../hooks/useGenerateReportForm'
import { CollateralSearchInput } from '@/features/collaterals'
import { downloadFile } from '@/lib/utils'

const reportTemplateKeysInputMap: Record<Report['key'], InputElement> = {
  loan: LoanSearchInput,
  collateral: CollateralSearchInput,
}

const GenerateReportForm = ({ report }: { report: Report }) => {
  const form = useGenerateReportForm({ report, onSuccess: downloadFile })

  return (
    <FormContainer form={form}>
      <Form form={form}>
        <FormRow>
          <FormReadOnlyGroup name="title" label="Título" value={report.title} />
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
      </Form>
    </FormContainer>
  )
}

export default GenerateReportForm
