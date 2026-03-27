import {
  Fieldset,
  FormHtmlDisplayGroup,
  MasterDetailLayout,
  FormReadOnlyGroup,
  FormReadonlyGroupLabelLink,
  Row,
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
          <Row>
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
          </Row>
          <Row>
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
          </Row>
        </Fieldset>
        <Fieldset legend="Balances">
          <Row>
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
          </Row>
          <Row>
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
          </Row>
        </Fieldset>
        <ViewMore>
          <Fieldset legend="Fechas">
            <Row>
              <FormReadOnlyGroup
                name="startDate"
                label="Fecha de inicio"
                value={toFormattedDate(loan.startDate)}
              />
            </Row>
            <Row>
              <FormReadOnlyGroup
                name="deliveryDate"
                label="Fecha de entrega"
                value={toFormattedDate(loan.deliveryDate)}
              />
            </Row>
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
          <Row>
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
          </Row>
          <Row>
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
          </Row>
          <Row>
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
          </Row>
        </Fieldset>
        <Fieldset legend="Detalles">
          <Row>
            <FormReadOnlyGroup
              name="status"
              label="Estado"
              value={loanStatusSpanishTranslations[loan.status]}
            />
          </Row>
          <Row>
            <FormReadOnlyGroup
              name="loanPurpose"
              label="Destino"
              value={loan.loanPurpose}
            />
          </Row>
          <Row>
            <FormReadOnlyGroup
              name="legacyId"
              label="Id legado"
              value={loan.legacyId}
              optional
            />
          </Row>
        </Fieldset>
      </MasterDetailLayout.Detail>
    </MasterDetailLayout>
  )
}

export default LoanOverview
