import {
  Fieldset,
  FormHtmlDisplayGroup,
  MasterDetailLayout,
  FormReadOnlyGroup,
  FormReadonlyGroupLabelLink,
  LayoutRow,
} from '@/components'
import { Transaction } from '../models/transaction'
import { buildLoanLabelById } from '@/features/loans'
import { toCurrency, toFormattedDate } from '@/lib/utils'
import { buildProfileFullName } from '@/features/profiles'

const TransactionOverview = ({ transaction }: { transaction: Transaction }) => {
  return (
    <MasterDetailLayout>
      <MasterDetailLayout.Master>
        <Fieldset legend="Desglose">
          <LayoutRow>
            <FormReadOnlyGroup
              name="value"
              label="Monto"
              value={toCurrency(transaction.value)}
            />
            <FormReadOnlyGroup
              name="arrearBalance"
              label="Balance pendiente pagado"
              value={
                transaction.arrearBalance
                  ? toCurrency(transaction.arrearBalance)
                  : 'N/A'
              }
            />
          </LayoutRow>
          <LayoutRow>
            <FormReadOnlyGroup
              name="capitalValue"
              label="Capital"
              value={toCurrency(transaction.capitalValue)}
            />
            <FormReadOnlyGroup
              name="interestValue"
              label="Interés"
              value={toCurrency(transaction.interestValue)}
            />
          </LayoutRow>
          <LayoutRow>
            <FormReadOnlyGroup
              name="penaltyFee"
              label="Mora"
              value={toCurrency(transaction.penaltyFee)}
            />
            <FormReadOnlyGroup
              name="feePaid"
              label="Mora pendiente pagada"
              value={toCurrency(transaction.feePaid)}
            />
          </LayoutRow>
        </Fieldset>
        <Fieldset legend="Autores">
          <LayoutRow>
            <FormReadOnlyGroup
              name="actor"
              label={
                transaction.actor ? (
                  <FormReadonlyGroupLabelLink
                    to="/profiles/$id"
                    params={{ id: transaction.actorId?.toString() }}
                  >
                    Actor
                  </FormReadonlyGroupLabelLink>
                ) : (
                  'Actor'
                )
              }
              value={
                transaction.actor
                  ? buildProfileFullName(transaction.actor)
                  : 'N/A'
              }
            />
            <FormReadOnlyGroup
              name="createdById"
              label={
                <FormReadonlyGroupLabelLink
                  to="/access-control/users/$username"
                  params={{ username: transaction.createdByUsername }}
                >
                  Creado por
                </FormReadonlyGroupLabelLink>
              }
              value={transaction.createdByUsername}
            />
          </LayoutRow>
        </Fieldset>
      </MasterDetailLayout.Master>
      <MasterDetailLayout.Detail>
        <Fieldset legend="Datos">
          <LayoutRow>
            <FormReadOnlyGroup
              name="id"
              label={
                <FormReadonlyGroupLabelLink
                  to="/loans/$id"
                  params={{ id: transaction.loanId.toString() }}
                >
                  Préstamo
                </FormReadonlyGroupLabelLink>
              }
              value={buildLoanLabelById(transaction.loanId)}
            />
          </LayoutRow>
          <LayoutRow>
            <FormReadOnlyGroup
              name="client"
              label={
                <FormReadonlyGroupLabelLink
                  to="/profiles/$id"
                  params={{ id: transaction.clientId.toString() }}
                >
                  Cliente
                </FormReadonlyGroupLabelLink>
              }
              value={buildProfileFullName(transaction.client)}
            />
          </LayoutRow>
          <LayoutRow>
            <FormReadOnlyGroup
              name="date"
              label="Fecha"
              value={toFormattedDate(transaction.date)}
            />
          </LayoutRow>
          <LayoutRow>
            <FormReadOnlyGroup
              name="lateDays"
              label="Atraso"
              value={`${transaction.lateDays} días`}
            />
          </LayoutRow>
          <LayoutRow>
            <FormReadOnlyGroup
              name="legacyId"
              label="Id legado"
              value={transaction.legacyId}
              optional
            />
          </LayoutRow>
        </Fieldset>
      </MasterDetailLayout.Detail>
      <MasterDetailLayout.MasterFooter>
        <FormHtmlDisplayGroup
          name="description"
          label="Descripción"
          value={transaction.description}
        />
      </MasterDetailLayout.MasterFooter>
    </MasterDetailLayout>
  )
}

export default TransactionOverview
