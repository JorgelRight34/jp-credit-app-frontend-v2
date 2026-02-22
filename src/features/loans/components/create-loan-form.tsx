import {
  CurrencyInput,
  DataModuleFormProps,
  DateInput,
  Form,
  FormContainer,
  FormGroup,
  FormRow,
  FormSelectGroup,
  FormWatch,
  NumericInput,
  PercentageInput,
  RichTextEditor,
  Tab,
  Tabs,
} from '@/components'
import { useLoanForm } from '../hooks/useLoanForm'
import { loanPaymentFrequencySelectOptions } from '../lib/constants'
import { LoanOfficerSearchInput, ProfileSearchInput } from '@/features/profiles'
import LoanProjectionCard from './loan-projection-card'
import { Loan } from '../models/loan'
import { LoanFormValues } from '../lib/schemas/loanFormSchema'
import LoanAmortizationPreview from './loan-amortization-preview'
import { Project } from '@/features/projects'

interface CreateLoanFormProps extends DataModuleFormProps<
  Loan,
  LoanFormValues
> {
  project: Project
}

const CreateLoanForm = (props: CreateLoanFormProps) => {
  const form = useLoanForm(props)

  return (
    <FormContainer form={form}>
      <Tabs>
        <Tab eventKey="data" title="Datos">
          <Form form={form}>
            <div className="flex">
              <div className="w-8/12">
                <FormRow>
                  <FormGroup
                    name="approvedAmount"
                    label="Monto aprobado"
                    input={CurrencyInput}
                  />
                  <FormGroup
                    name="annualInterestRate"
                    label="Tasa de interés"
                    input={PercentageInput}
                  />
                </FormRow>
                <FormRow>
                  <FormGroup
                    name="startDate"
                    label="Fecha de inicio"
                    input={DateInput}
                  />
                  <FormGroup
                    name="deliveryDate"
                    label="Fecha de entrega"
                    input={DateInput}
                  />
                </FormRow>
                <FormRow>
                  <FormSelectGroup
                    name="paymentFrequency"
                    label="Frecuencia de pago"
                    options={loanPaymentFrequencySelectOptions}
                  />
                  <FormGroup
                    name="numberOfPayments"
                    label="Número de pagos"
                    autoComplete="off"
                    input={NumericInput}
                  />
                </FormRow>
                <FormRow>
                  <FormGroup
                    name="clientProfileId"
                    label="Cliente"
                    input={ProfileSearchInput}
                  />
                  <FormGroup
                    name="guarantorProfileId"
                    label="Garante"
                    input={ProfileSearchInput}
                  />
                </FormRow>
                <FormRow>
                  <FormGroup
                    name="loanOfficerProfileId"
                    label="Oficial"
                    input={LoanOfficerSearchInput}
                  />
                </FormRow>
              </div>
              <div className="w-4/12 pl-6">
                <FormWatch
                  form={form}
                  names={[
                    'approvedAmount',
                    'numberOfPayments',
                    'annualInterestRate',
                    'paymentFrequency',
                  ]}
                  render={(values) => (
                    <LoanProjectionCard
                      className="w-full shadow-sm"
                      amount={values[0]}
                      nPer={values[1]}
                      annualInterestRate={values[2]}
                      paymentFrequency={values[3]}
                    />
                  )}
                />
              </div>
            </div>
            <FormGroup
              name="description"
              label="Descripción"
              className="h-100"
              input={RichTextEditor}
            />
          </Form>
        </Tab>
        <Tab eventKey="amortization" title="Amortización" forceRender>
          <FormWatch
            form={form}
            names={[
              'approvedAmount',
              'annualInterestRate',
              'paymentFrequency',
              'numberOfPayments',
              'startDate',
            ]}
            render={(values) => (
              <LoanAmortizationPreview
                calculationInput={{
                  principalBalance: +values[0],
                  annualInterestRate: +values[1],
                  paymentFrequency: +values[2],
                  numberOfPayments: +values[3],
                }}
                startDate={values[4]}
              />
            )}
          />
        </Tab>
      </Tabs>
    </FormContainer>
  )
}

export default CreateLoanForm
