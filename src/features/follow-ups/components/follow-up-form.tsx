import {
  DataModuleFormProps,
  Form,
  FormContainer,
  FormGroup,
  FormReadOnlyGroup,
  FormRow,
  Input,
  RichTextEditor,
} from '@/components'
import { useFollowUpForm } from '../hooks/useFollowUpForm'
import { FollowUp } from '../models/followUp'
import { FollowUpFormValues } from '../lib/schemas/followUpFormSchema'
import { LoanSearchInput } from '@/features/loans'
import { getTodayAsInputDate } from '@/lib/utils'

interface FollowUpFormProps extends DataModuleFormProps<
  FollowUp,
  FollowUpFormValues
> {
  followUp?: FollowUp
}

const FollowUpForm = ({ followUp, ...props }: FollowUpFormProps) => {
  const form = useFollowUpForm({
    defaultValues: followUp,
    shouldEdit: !!followUp,
    followUpId: followUp?.id,
    toastMessage: () => 'Guardado',
    ...props,
  })

  return (
    <FormContainer form={form}>
      <Form form={form}>
        <FormRow>
          <FormGroup name="title" label="Título" input={Input} />
        </FormRow>
        <FormRow>
          <FormGroup name="loanId" label="Préstamo" input={LoanSearchInput} />
        </FormRow>
        <FormRow>
          <FormReadOnlyGroup
            name="date"
            label="Fecha"
            value={getTodayAsInputDate()}
            disabled
          />
        </FormRow>
        <FormGroup name="body" label="Cuerpo" input={RichTextEditor} />
      </Form>
    </FormContainer>
  )
}

export default FollowUpForm
