import { toCurrency } from '@/lib/utils/utils'
import { accountStatementsCacheKey } from '../../lib/constants'
import { getTransactionIdLabel } from '@/features/Transactions/lib/utils'
import { Transaction, TransactionsQuery } from '@/features/transactions'
import {
  Column,
  DateLabel,
  EntityDataTable,
  EntityDataTableProps,
  getFooterTotalAsCurrency,
} from '@/components'
import { transactionClient } from '@/features/transactions/services/transactionsClient'

type ClientAccountStatementsDataTableProps = EntityDataTableProps<
  Transaction,
  TransactionsQuery
>

const columns: Column<Transaction>[] = [
  {
    accessorKey: 'date',
    header: 'Fecha',
    enableSorting: true,
    cell: ({ row }) => <DateLabel date={row.original.date} />,
  },
  {
    accessorKey: 'id',
    header: 'Documento',
    enableSorting: true,
    cell: ({ row }) => getTransactionIdLabel(row.original),
  },
  {
    accessorKey: 'capitalValue',
    header: 'Capital',
    enableSorting: true,
    cell: ({ row }) => toCurrency(row.original.capitalValue),
    footer: (info) => getFooterTotalAsCurrency(info, 'capitalValue'),
  },
  {
    accessorKey: 'interestValue',
    header: 'Interés',
    enableSorting: true,
    cell: ({ row }) => toCurrency(row.original.interestValue),
    footer: (info) => getFooterTotalAsCurrency(info, 'interestValue'),
  },
  {
    accessorKey: 'penaltyFee',
    header: 'Mora',
    enableSorting: true,
    cell: ({ row }) => toCurrency(row.original.penaltyFee),
    footer: (info) => getFooterTotalAsCurrency(info, 'penaltyFee'),
  },
  {
    accessorKey: 'total',
    header: 'Total Pagado',
    enableSorting: true,
    cell: ({ row }) => toCurrency(row.original.total),
    footer: (info) => getFooterTotalAsCurrency(info, 'total'),
  },
]

const ClientAccountStatementsDataTable = ({
  ...props
}: ClientAccountStatementsDataTableProps) => {
  return (
    <EntityDataTable
      title="Estado de Cuenta"
      cacheKey={[...accountStatementsCacheKey, 'client']}
      loader={transactionClient.getTransactions}
      columns={columns}
      {...props}
    />
  )
}

export default ClientAccountStatementsDataTable
