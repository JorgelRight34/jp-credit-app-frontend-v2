import {
  Fieldset,
  FormHtmlDisplayGroup,
  MasterDetailLayout,
  FormReadOnlyGroup,
  FormReadonlyGroupLabelLink,
  LayoutRow,
} from '@/components'
import { PropsWithTransaction } from '../models/transaction'
import { buildLoanLabelById } from '@/features/loans'
import { toCurrency, toFormattedDate } from '@/lib/utils'
import { buildProfileFullName } from '@/features/profiles'

const TransactionOverview = ({ transaction }: PropsWithTransaction) => (
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
            label="Mora pagada"
            value={toCurrency(transaction.feePaid)}
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

export default TransactionOverview
