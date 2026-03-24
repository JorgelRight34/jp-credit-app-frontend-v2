import {
  CurrencyInput,
  DataModuleFormProps,
  DateInput,
  Form,
  FormContainer,
  FormGroup,
  FormMasterDetailLayout,
  FormRow,
  FormWatch,
  NumericInput,
  PaymentFrequencySelect,
  PercentageInput,
  RichTextEditor,
  Tab,
  TabPanel,
  Tabs,
  TabsList,
} from '@/components'
import { useLoanForm } from '../hooks/useLoanForm'
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
        <TabsList>
          <Tab index={0}>Datos</Tab>
          <Tab index={1}>Amortización</Tab>
        </TabsList>
        <TabPanel index={0}>
          <Form form={form}>
            <FormMasterDetailLayout>
              <FormMasterDetailLayout.Master>
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
                  <FormGroup
                    name="paymentFrequency"
                    label="Frecuencia de pago"
                    input={PaymentFrequencySelect}
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
              </FormMasterDetailLayout.Master>
              <FormMasterDetailLayout.Detail>
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
                      className="h-full w-full shadow-sm"
                      amount={values[0]}
                      nPer={values[1]}
                      annualInterestRate={values[2]}
                      paymentFrequency={values[3]}
                    />
                  )}
                />
              </FormMasterDetailLayout.Detail>
            </FormMasterDetailLayout>
            <FormGroup
              name="description"
              label="Descripción"
              input={RichTextEditor}
            />
          </Form>
        </TabPanel>
        <TabPanel index={1} unmountOnExit>
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
        </TabPanel>
      </Tabs>
    </FormContainer>
  )
}

export default CreateLoanForm
