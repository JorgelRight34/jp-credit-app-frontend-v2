import {
  DateInput,
  Form,
  FormContainer,
  FormContainerButtons,
  FormGroup,
  FormRow,
  FormSelectGroup,
  NumericInput,
  PercentageInput,
  RichTextEditor,
  Tab,
  Tabs,
} from '@/components'
import { useLoanForm } from '../hooks/useLoanForm'
import { useState } from 'react'
import {
  loanPaymentFrequencySelectOptions,
  loanStatusSelectOptions,
} from '../lib/constants'

const CreateLoanForm = () => {
  const [isDirty, setIsDirty] = useState(false)
  const form = useLoanForm({ onDirtyChange: setIsDirty })

  return (
    <FormContainer
      footer={<FormContainerButtons isDirty={isDirty} form={form} />}
    >
      <Tabs>
        <Tab eventKey="data" title="Datos">
          {/* Montos y tasa */}
          <Form form={form}>
            <FormRow>
              <FormGroup
                name="approvedAmount"
                label="Monto aprobado"
                input={NumericInput}
              />
              <FormGroup
                name="disbursedAmount"
                label="Monto desembolsado"
                input={NumericInput}
              />
              <FormGroup
                name="interestRate"
                label="Tasa de interés"
                input={PercentageInput}
              />
            </FormRow>

            {/* Fechas */}
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
              <FormSelectGroup
                name="status"
                label="Estado"
                options={loanStatusSelectOptions}
              />
            </FormRow>

            {/* Plan de pagos */}
            <FormRow>
              <FormSelectGroup
                name="paymentFrequency"
                label="Frecuencia de pago"
                options={loanPaymentFrequencySelectOptions}
              />
              <FormGroup
                name="numberOfPayments"
                label="Número de pagos"
                input={NumericInput}
              />
            </FormRow>

            {/* Actores */}
            <FormRow>
              <FormGroup name="clientId" label="Cliente" input={NumericInput} />
              <FormGroup
                name="loanOfficerId"
                label="Oficial"
                input={NumericInput}
              />
              <FormGroup
                name="guarantorId"
                label="Garante"
                input={NumericInput}
              />
            </FormRow>

            {/* Descripción (full width) */}
            <FormGroup
              name="description"
              label="Descripción"
              input={RichTextEditor}
            />
          </Form>
        </Tab>
        <Tab eventKey="amortization" title="Amortización"></Tab>
      </Tabs>
    </FormContainer>
  )
}

export default CreateLoanForm
