import { FormHtmlDisplayGroup, FormReadOnlyGroup, FormRow } from '@/components'
import { Loan } from '../models/loan'
import { toCurrency, toFormattedDate, toPercentage } from '@/lib/utils'
import { loanPaymentFrequencyStringMap } from '../lib/constants'
import LoanProjectionCard from './loan-projection-card'
import { FormReadonlyGroupLabelLink } from '@/components/organisms/form/components/form-readonly-group'

const LoanOverview = ({ loan }: { loan: Loan }) => {
  return (
    <section>
      {' '}
      <div className="flex">
        <div className="w-8/12">
          <section>
            <FormRow>
              <FormReadOnlyGroup
                name="approvedAmount"
                label="Monto aprobado"
                value={toCurrency(loan.approvedAmount)}
              />
              <FormReadOnlyGroup
                name="annualInterestRate"
                label="Tasa de interés"
                value={toPercentage(loan.annualInterestRate)}
              />
            </FormRow>
            <FormRow>
              <FormReadOnlyGroup
                name="startDate"
                label="Fecha de inicio"
                value={toFormattedDate(loan.startDate)}
              />
              <FormReadOnlyGroup
                name="deliveryDate"
                label="Fecha de entrega"
                value={toFormattedDate(loan.deliveryDate)}
              />
            </FormRow>
            <FormRow>
              <FormReadOnlyGroup
                name="paymentFrequency"
                label="Frecuencia de pago"
                value={loanPaymentFrequencyStringMap[loan.paymentFrequency]}
              />
              <FormReadOnlyGroup
                name="numberOfPayments"
                label="Número de pagos"
                value={loan.numberOfPayments}
              />
            </FormRow>
            <FormRow>
              <FormReadOnlyGroup
                name="client"
                label={
                  <FormReadonlyGroupLabelLink
                    to="/profiles/$id"
                    params={{ id: loan.client.profileId.toString() }}
                  >
                    Cliente
                  </FormReadonlyGroupLabelLink>
                }
                value={loan.client.name}
              />
              <FormReadOnlyGroup
                name="guarantor"
                label={
                  loan.guarantor ? (
                    <FormReadonlyGroupLabelLink
                      to="/profiles/$id"
                      params={{ id: loan.guarantor?.profileId.toString() }}
                    >
                      Garante
                    </FormReadonlyGroupLabelLink>
                  ) : (
                    'Garante'
                  )
                }
                value={loan.guarantor?.name}
              />
            </FormRow>
            <FormRow>
              <FormReadOnlyGroup
                name="loanOfficer"
                label={
                  loan.loanOfficer ? (
                    <FormReadonlyGroupLabelLink
                      to="/profiles/$id"
                      params={{ id: loan.loanOfficer?.profileId.toString() }}
                    >
                      Oficial
                    </FormReadonlyGroupLabelLink>
                  ) : (
                    'Oficial'
                  )
                }
                value={loan.loanOfficer?.name}
              />
            </FormRow>
          </section>
        </div>
        <div className="w-4/12 pl-6">
          <LoanProjectionCard
            amount={loan.approvedAmount}
            nPer={loan.numberOfPayments}
            annualInterestRate={loan.annualInterestRate}
            paymentFrequency={loan.paymentFrequency}
          />
        </div>
      </div>
      <FormHtmlDisplayGroup
        name="description"
        label="Descripción"
        value={loan.description}
        optional
      />
    </section>
  )
}

export default LoanOverview
