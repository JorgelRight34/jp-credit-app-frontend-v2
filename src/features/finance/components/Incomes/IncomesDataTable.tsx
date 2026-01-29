import { Column, DateLabel, getFooterTotalAsCurrency } from '@/components'
import { LinkToLoan } from '@/features/loans'
import { Transaction, TransactionType } from '@/features/transactions'
import { sortDateRows, toCurrency } from '@/lib/utils/utils'
import {
  financialBreakdownBaseColumns,
  transactionLoanColumnFooter,
} from '../../lib/constants'
import FinanceGroupedTable, {
  FinancialBreakdownDataTableProps,
} from '../FinanceGroupedTable'

const groupColumns: Column<Transaction>[] = [
  {
    id: 'date',
    accessorKey: 'date',
    header: 'Fecha',
    enableSorting: true,
    sortingFn: sortDateRows,
    cell: ({ row }) => <DateLabel date={row.original.date} />,
  },
  {
    id: 'clientName',
    accessorKey: 'clientName',
    header: 'Cliente',
  },
  {
    id: 'loanId',
    accessorKey: 'loanId',
    header: 'Préstamo',
    cell: ({ row }) => <LinkToLoan id={row.original.loanId} />,
    footer: transactionLoanColumnFooter,
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
    header: 'Intereses',
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
    id: 'total',
    accessorKey: 'value',
    header: 'Total',
    cell: ({ row }) => toCurrency(row.original.value),
    footer: (info) => getFooterTotalAsCurrency(info, 'value'),
  },
]

const IncomesDataTable = ({
  data = [],
  query,
}: FinancialBreakdownDataTableProps) => {
  return (
    <FinanceGroupedTable
      data={data}
      columns={financialBreakdownBaseColumns}
      groupColumns={groupColumns}
      type={TransactionType.PC}
      query={query}
    />
  )
}

export default IncomesDataTable
