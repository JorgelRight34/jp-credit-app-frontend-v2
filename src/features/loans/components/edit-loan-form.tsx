import {
  DataModuleFormProps,
  Form,
  FormContainer,
  FormGroup,
  MasterDetailLayout,
  FormReadOnlyGroup,
  FormRow,
  RichTextEditor,
} from '@/components'
import LoanProjectionCard from './loan-projection-card'
import { Loan } from '../models/loan'
import LoanPurposeSearchInput from './loan-purpose-search-input'
import { LoanEditFormValues } from '../lib/schemas/loanEditFormSchema'
import { useEditLoanForm } from '../hooks/useEditLoanForm'
import {
  getFullName,
  toCurrency,
  toFormattedDate,
  toPercentage,
} from '@/lib/utils'
import { loanPaymentFrequencyStringMap } from '../lib/constants'

interface EditLoanFormProps extends DataModuleFormProps<
  void,
  LoanEditFormValues
> {
  loan: Loan
}

const EditLoanForm = ({ loan, ...props }: EditLoanFormProps) => {
  const form = useEditLoanForm({ loan, ...props })

  return (
    <FormContainer form={form}>
      <Form form={form}>
        <MasterDetailLayout>
          <MasterDetailLayout.Master>
            <FormRow>
              <FormReadOnlyGroup
                name="approvedAmount"
                label="Monto aprobado"
                value={toCurrency(loan.approvedAmount)}
                disabled
              />
              <FormReadOnlyGroup
                name="annualInterestRate"
                label="Tasa de interés"
                value={toPercentage(loan.annualInterestRate)}
                disabled
              />
            </FormRow>
            <FormRow>
              <FormReadOnlyGroup
                name="startDate"
                label="Fecha de inicio"
                value={toFormattedDate(loan.startDate)}
                disabled
              />
              <FormReadOnlyGroup
                name="deliveryDate"
                label="Fecha de entrega"
                value={toFormattedDate(loan.deliveryDate)}
                disabled
              />
            </FormRow>
            <FormRow>
              <FormReadOnlyGroup
                name="paymentFrequency"
                label="Frecuencia de pago"
                value={loanPaymentFrequencyStringMap[loan.paymentFrequency]}
                disabled
              />
              <FormReadOnlyGroup
                name="numberOfPayments"
                label="Número de pagos"
                value={loan.numberOfPayments}
                disabled
              />
            </FormRow>
            <FormRow>
              <FormReadOnlyGroup
                name="clientProfileId"
                label="Cliente"
                value={getFullName(loan.client)}
                disabled
              />
              <FormReadOnlyGroup
                name="guarantorProfileId"
                label="Garante"
                value={loan.guarantor ? getFullName(loan.guarantor) : 'N/D'}
                disabled
              />
            </FormRow>
            <FormRow>
              <FormReadOnlyGroup
                name="guarantorProfileId"
                label="Garante"
                value={loan.guarantor ? getFullName(loan.loanOfficer) : 'N/D'}
                disabled
              />
              <FormGroup
                name="loanPurposeId"
                label="Destino"
                input={LoanPurposeSearchInput}
              />
            </FormRow>
          </MasterDetailLayout.Master>
          <MasterDetailLayout.Detail>
            <LoanProjectionCard
              className="h-full w-full shadow-sm"
              amount={loan.approvedAmount}
              nPer={loan.numberOfPayments}
              annualInterestRate={loan.annualInterestRate}
              paymentFrequency={loan.paymentFrequency}
            />
          </MasterDetailLayout.Detail>
        </MasterDetailLayout>
        <FormGroup
          name="description"
          label="Descripción"
          input={RichTextEditor}
          optional
        />
      </Form>
    </FormContainer>
  )
}

export default EditLoanForm
