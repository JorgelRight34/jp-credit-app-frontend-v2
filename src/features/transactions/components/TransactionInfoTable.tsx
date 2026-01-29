import { InfoTable } from '@/components'
import { Transaction } from '../models/transaction'
import { LinkToLoan } from '@/features/loans'
import { LinkToProfile } from '@/features/profiles'
import { ND, toCurrency, toFormattedDate } from '@/lib/utils'
import { transactionTypesFullNames } from '../lib/constants'

interface TransactionInfoTable {
  transaction: Transaction
}

const TransactionInfoTable = ({ transaction }: TransactionInfoTable) => {
  return (
    <InfoTable
      data={[
        ['Id', transaction.id],
        ['Préstamo', <LinkToLoan key="loan" id={transaction.loanId} />],
        [
          'Cliente',
          transaction.payerId ? (
            <LinkToProfile id={transaction.payerId} fullName={true} />
          ) : (
            ND
          ),
        ],
        [
          'Total',
          toCurrency(transaction.capitalValue + transaction.interestValue),
        ],
        ['Capital', toCurrency(transaction.capitalValue)],
        ['Intereses', toCurrency(transaction.interestValue)],
        ['Tipo', transactionTypesFullNames[transaction.type]],
        ['Mora', toCurrency(transaction.penaltyFee)],
        ['Fecha', toFormattedDate(transaction.date)],
        ['Cerrado', transaction.isClosed ? 'Sí' : 'No'],
      ]}
    />
  )
}

export default TransactionInfoTable
