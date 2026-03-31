import {
  Fieldset,
  FormHtmlDisplayGroup,
  MasterDetailLayout,
  FormReadOnlyGroup,
  FormReadonlyGroupLabelLink,
  LayoutRow,
  ViewMore,
} from '@/components'
import { PropsWithLoan } from '../models/loan'
import { toCurrency, toFormattedDate, toPercentage } from '@/lib/utils'
import {
  loanPaymentFrequencyStringMap,
  loanStatusSpanishTranslations,
} from '../lib/constants'
import { getProfileInvertedName } from '@/features/profiles'

const LoanOverview = ({ loan }: PropsWithLoan) => {
  return (
    <MasterDetailLayout>
      <MasterDetailLayout.Master>
        <Fieldset legend="Finanzas">
          <LayoutRow>
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
          </LayoutRow>
          <LayoutRow>
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
          </LayoutRow>
        </Fieldset>
        <Fieldset legend="Balances">
          <LayoutRow>
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
          </LayoutRow>
          <LayoutRow>
            <FormReadOnlyGroup
              name="feePaid"
              label="Mora pagada"
              value={toCurrency(loan.feePaid)}
            />
            <FormReadOnlyGroup
              name="penaltyBalance"
              label="Mora total"
              value={toCurrency(loan.penaltyBalance)}
            />
          </LayoutRow>
        </Fieldset>
        <ViewMore>
          <Fieldset legend="Fechas">
            <LayoutRow>
              <FormReadOnlyGroup
                name="startDate"
                label="Fecha de inicio"
                value={toFormattedDate(loan.startDate)}
              />
            </LayoutRow>
            <LayoutRow>
              <FormReadOnlyGroup
                name="deliveryDate"
                label="Fecha de entrega"
                value={toFormattedDate(loan.deliveryDate)}
              />
            </LayoutRow>
          </Fieldset>
        </ViewMore>
        <FormHtmlDisplayGroup
          name="description"
          label="Descripción"
          value={loan.description}
          optional
        />
      </MasterDetailLayout.Master>
      <MasterDetailLayout.Detail>
        <Fieldset legend="Miembros">
          <LayoutRow>
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
          </LayoutRow>
          <LayoutRow>
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
          </LayoutRow>
          <LayoutRow>
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
                loan.loanOfficer
                  ? getProfileInvertedName(loan.loanOfficer)
                  : null
              }
            />
          </LayoutRow>
        </Fieldset>
        <Fieldset legend="Detalles">
          <LayoutRow>
            <FormReadOnlyGroup
              name="status"
              label="Estado"
              value={loanStatusSpanishTranslations[loan.status]}
            />
          </LayoutRow>
          <LayoutRow>
            <FormReadOnlyGroup
              name="loanPurpose"
              label="Destino"
              value={loan.loanPurpose}
            />
          </LayoutRow>
          <LayoutRow>
            <FormReadOnlyGroup
              name="legacyId"
              label="Id legado"
              value={loan.legacyId}
              optional
            />
          </LayoutRow>
        </Fieldset>
      </MasterDetailLayout.Detail>
    </MasterDetailLayout>
  )
}

export default LoanOverview
