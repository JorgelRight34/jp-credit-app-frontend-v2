import {
  Fieldset,
  FormHtmlDisplayGroup,
  FormReadOnlyGroup,
  FormReadonlyGroupLabelLink,
  FormRow,
  ViewMore,
} from '@/components'
import { Transaction } from '../models/transaction'
import { buildLoanLabelById } from '@/features/loans'
import { toCurrency, toFormattedDate } from '@/lib/utils'
import { buildProfileFullName } from '@/features/profiles'

const TransactionOverview = ({ transaction }: { transaction: Transaction }) => {
  return (
    <section>
      <FormRow>
        <Fieldset legend="Datos">
          <FormRow>
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
          </FormRow>
          <FormRow>
            <FormReadOnlyGroup
              name="value"
              label="Monto"
              value={toCurrency(transaction.value)}
            />
            <FormReadOnlyGroup
              name="date"
              label="Fecha"
              value={toFormattedDate(transaction.date)}
            />
          </FormRow>
        </Fieldset>
      </FormRow>
      <FormRow>
        <Fieldset legend="Desglose">
          <FormRow>
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
          </FormRow>
          <FormRow>
            <FormReadOnlyGroup
              name="penaltyFee"
              label="Mora"
              value={toCurrency(transaction.penaltyFee)}
            />
            <FormReadOnlyGroup
              name="lateDays"
              label="Atraso"
              value={`${transaction.lateDays} días`}
            />
          </FormRow>
          <FormRow>
            <FormReadOnlyGroup
              name="outstandingAmount"
              label="Balance pendiente pagado"
              value={toCurrency(transaction.outstandingAmount)}
            />
            <FormReadOnlyGroup
              name="feePaid"
              label="Mora pendiente pagada"
              value={toCurrency(transaction.feePaid)}
            />
          </FormRow>
        </Fieldset>
      </FormRow>
      <ViewMore className="mb-6">
        <Fieldset legend="Autores">
          <FormRow>
            <FormReadOnlyGroup
              name="actor"
              label={
                <FormReadonlyGroupLabelLink
                  to="/profiles/$id"
                  params={{ id: transaction.actorId.toString() }}
                >
                  Actor
                </FormReadonlyGroupLabelLink>
              }
              value={buildProfileFullName(transaction.actor!)}
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
          </FormRow>
        </Fieldset>
      </ViewMore>
      <FormHtmlDisplayGroup
        name="description"
        label="Descripción"
        value={transaction.description}
      />
    </section>
  )
}

export default TransactionOverview
