import {
  DataModuleFormProps,
  Form,
  FormErrorsPanel,
  FormGroup,
  FormLayout,
  FormRow,
} from '@/components/organisms'
import { ExportFormValues } from '../lib/schemas/exportFormSchema'
import { ExportHandlerResponse, useExportForm } from '../hooks/useExportForm'
import {
  AccentBtn,
  DownloadIcon,
  Icon,
  InputProps,
  NumericInput,
  SelectInput,
} from '@/components/atoms'
import { downloadFileFromAxiosResponse } from '@/lib/utils'

interface ExportFormProps extends DataModuleFormProps<
  ExportHandlerResponse,
  ExportFormValues
> {
  onSubmit: (options: ExportFormValues) => Promise<ExportHandlerResponse>
}

const ExportForm = (props: ExportFormProps) => {
  const form = useExportForm({
    ...props,
    onSuccess: downloadFileFromAxiosResponse,
  })

  return (
    <Form form={form}>
      <FormLayout
        errors={<FormErrorsPanel control={form.control} />}
        footer={
          <AccentBtn onClick={form.submit}>
            <Icon icon={DownloadIcon}>Exportar</Icon>
          </AccentBtn>
        }
      >
        <FormRow>
          <FormGroup
            label="Exportar como"
            name="format"
            input={ExportFormatSelect}
          />
        </FormRow>
        <FormRow>
          <FormGroup
            label="Pag desde"
            name="initialPage"
            input={NumericInput}
          />
          <FormGroup label="Pag hasta" name="endPage" input={NumericInput} />
        </FormRow>
        <FormRow>
          <FormGroup label="Por pagina" name="limit" input={NumericInput} />
        </FormRow>
      </FormLayout>
    </Form>
  )
}

const ExportFormatSelect = (props: InputProps) => (
  <SelectInput
    {...props}
    label={''}
    options={[
      ['pdf', 'PDF'],
      ['csv', 'CSV'],
    ]}
  />
)

export default ExportForm
