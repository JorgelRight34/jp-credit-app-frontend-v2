import {
  FormHtmlDisplayGroup,
  FormReadOnlyGroup,
  FormRow,
  ViewMore,
} from '@/components'
import { Loan } from '../models/loan'
import { toCurrency, toFormattedDate, toPercentage } from '@/lib/utils'
import {
  loanPaymentFrequencyStringMap,
  loanStatusSpanishTranslations,
} from '../lib/constants'
import { FormReadonlyGroupLabelLink } from '@/components/organisms/form/components/form-readonly-group'
import { getProfileInvertedName } from '@/features/profiles'

const LoanOverview = ({ loan }: { loan: Loan }) => {
  return (
    <section>
      <div>
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
            value={getProfileInvertedName(loan.client)}
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
            value={
              loan.guarantor ? getProfileInvertedName(loan.guarantor) : null
            }
          />
        </FormRow>
        <FormRow>
          <FormReadOnlyGroup
            name="principalBalance"
            label="Balance capital"
            value={toCurrency(loan.principalBalance)}
          />
          <FormReadOnlyGroup
            name="interestBalance"
            label="Balance interés"
            value={toCurrency(loan.interestBalance)}
          />
        </FormRow>
      </div>
      <ViewMore className="mb-6">
        <FormRow>
          <FormReadOnlyGroup
            name="feePaid"
            label="Mora pagada"
            value={toCurrency(loan.feePaid)}
          />
          <FormReadOnlyGroup
            name="totalFees"
            label="Mora total"
            value={toCurrency(loan.totalFees)}
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
            value={
              loan.loanOfficer ? getProfileInvertedName(loan.loanOfficer) : null
            }
          />
          <FormReadOnlyGroup
            name="status"
            label="Estado"
            value={loanStatusSpanishTranslations[loan.status]}
          />
        </FormRow>
      </ViewMore>
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
