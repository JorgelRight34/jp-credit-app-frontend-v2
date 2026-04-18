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

const LoanOverview = ({ loan }: PropsWithLoan) => (
  <MasterDetailLayout>
    <MasterDetailLayout.Master>
      <Fieldset legend="Términos">
        <LayoutRow>
          <FormReadOnlyGroup
            name="approvedAmount"
            label="Monto aprobado"
            value={toCurrency(loan.approvedAmount)}
          />
          <FormReadOnlyGroup
            name="paymentValue"
            label="Cuota"
            value={toCurrency(loan.paymentValue)}
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
            label="Número de cuotas"
            value={loan.numberOfPayments}
          />
        </LayoutRow>
        <LayoutRow>
          <FormReadOnlyGroup
            name="annualInterestRate"
            label="Tasa de interés"
            value={toPercentage(loan.annualInterestRate)}
          />
          <FormReadOnlyGroup
            name="penaltyRate"
            label="Penalidad por mora"
            value={toPercentage(loan.penaltyRate)}
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
            name="disbursedAmount"
            label="Desembolsado"
            value={toCurrency(loan.disbursedAmount)}
          />
          <FormReadOnlyGroup
            name="accruedInterest"
            label="Abono interés"
            value={toCurrency(loan.accruedInterest)}
          />
        </LayoutRow>
        <LayoutRow>
          <FormReadOnlyGroup
            name="feePaid"
            label="Abono mora"
            value={toCurrency(loan.feePaid)}
          />
          <FormReadOnlyGroup
            name="penaltyBalance"
            label="Atraso"
            value={toCurrency(loan.penaltyBalance)}
          />
        </LayoutRow>
      </Fieldset>
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
              loan.loanOfficer ? getProfileInvertedName(loan.loanOfficer) : null
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
            name="lastTransactionDate"
            label="Ultimo movimiento"
            value={
              loan.lastTransactionDate
                ? toFormattedDate(loan.lastTransactionDate)
                : 'N/D'
            }
            optional
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
    <MasterDetailLayout.MasterFooter>
      <ViewMore>
        <Fieldset legend="Fechas">
          <LayoutRow>
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
          </LayoutRow>
          <LayoutRow>
            <FormReadOnlyGroup
              name="updatedAt"
              label="Ultimo cambio"
              value={toFormattedDate(loan.updatedAt)}
            />
            <FormReadOnlyGroup
              name="expirationDate"
              label="Fecha de expiración"
              value={toFormattedDate(loan.expirationDate)}
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
    </MasterDetailLayout.MasterFooter>
  </MasterDetailLayout>
)

export default LoanOverview
