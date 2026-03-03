import {
  DataModuleFormProps,
  Form,
  FormErrorsPanel,
  FormGroup,
  FormLayout,
  FormRow,
} from '@/components/organisms'
import { ExportFormValues } from '../lib/schemas/exportFormSchema'
import { useExportForm } from '../hooks/useExportForm'
import {
  AccentBtn,
  DownloadIcon,
  InputProps,
  NumericInput,
  SelectInput,
} from '@/components/atoms'
import { downloadFile } from '@/lib/utils'

interface ExportFormProps extends DataModuleFormProps<Blob, ExportFormValues> {
  onSubmit: (options: ExportFormValues) => Promise<Blob>
}

const ExportForm = (props: ExportFormProps) => {
  const form = useExportForm({ ...props, onSuccess: downloadFile })

  return (
    <Form form={form}>
      <FormLayout
        errors={<FormErrorsPanel control={form.control} />}
        footer={
          <AccentBtn icon={DownloadIcon} onClick={form.submit}>
            Exportar
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
          <FormGroup label="Pag desde" name="pageStart" input={NumericInput} />
          <FormGroup label="Pag hasta" name="pageEnd" input={NumericInput} />
        </FormRow>
        <FormRow>
          <FormGroup label="Por pagina" name="limit" input={NumericInput} />
        </FormRow>
      </FormLayout>
    </Form>
  )
}

const ExportFormatSelect = (props: InputProps) => {
  return (
    <SelectInput
      {...props}
      label={''}
      options={[
        ['pdf', 'PDF'],
        ['csv', 'CSV'],
      ]}
    />
  )
}

export default ExportForm
