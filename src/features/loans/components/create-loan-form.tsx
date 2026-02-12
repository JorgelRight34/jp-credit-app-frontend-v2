import {
  CurrencyInput,
  DataModuleFormProps,
  DataTable,
  DateInput,
  Form,
  FormContainer,
  FormContainerButtons,
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
import { useState } from 'react'
import { loanPaymentFrequencySelectOptions } from '../lib/constants'
import { ProfileSearchInput } from '@/features/profiles'
import CreateLoanFormPreview from './create-loan-preview'
import { Loan } from '../models/loan'
import { LoanFormValues } from '../lib/schemas/loanFormSchema'
import { amortizationDatatableConfig } from '@/features/amortizations'

interface CreateLoanFormProps extends DataModuleFormProps<
  Loan,
  LoanFormValues
> {}

const CreateLoanForm = (props: CreateLoanFormProps) => {
  const [isDirty, setIsDirty] = useState(false)
  const [activeTab, setActiveTab] = useState<string | null>('data')
  const form = useLoanForm({ onDirtyChange: setIsDirty, ...props })

  return (
    <FormContainer
      footer={<FormContainerButtons isDirty={isDirty} form={form} />}
    >
      <Tabs onSelect={setActiveTab}>
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
                    name="clientId"
                    label="Cliente"
                    input={ProfileSearchInput}
                  />
                  <FormGroup
                    name="guarantorId"
                    label="Garante"
                    input={ProfileSearchInput}
                  />
                </FormRow>
                <FormRow>
                  <FormGroup
                    name="loanOfficerId"
                    label="Oficial"
                    input={ProfileSearchInput}
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
                    <CreateLoanFormPreview
                      className="w-full h-full shadow-sm"
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
        <Tab eventKey="amortization" title="Amortización">
          <FormWatch
            form={form}
            names={[
              'approvedAmount',
              'annualInterestRate',
              'paymentFrequency',
              'numberOfPayments',
            ]}
            render={(values) => (
              <DataTable
                query={{
                  principalBalance: values[0],
                  annualInterestRate: values[1],
                  paymentFrequency: values[2],
                  numberOfPayments: values[3],
                }}
                enabled={activeTab === 'amortization'}
                {...amortizationDatatableConfig}
              />
            )}
          />
        </Tab>
      </Tabs>
    </FormContainer>
  )
}

export default CreateLoanForm
