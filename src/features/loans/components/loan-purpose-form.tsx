import {
  DataModuleFormProps,
  Form,
  FormContainer,
  FormGroup,
  FormRow,
  Input,
} from '@/components'
import { LoanPurpose } from '../models/loanPurpose'
import { LoanPurposeFormValues } from '../lib/schemas/loanPurposeFormSchema'
import { useLoanPurposeForm } from '../hooks/useLoanPurposeForm'

const LoanPurposeForm = (
  props: DataModuleFormProps<LoanPurpose, LoanPurposeFormValues>,
) => {
  const form = useLoanPurposeForm(props)

  return (
    <FormContainer form={form}>
      <Form form={form}>
        <FormRow>
          <FormGroup label="Destino" name="name" input={Input} />
        </FormRow>
      </Form>
    </FormContainer>
  )
}

export default LoanPurposeForm
