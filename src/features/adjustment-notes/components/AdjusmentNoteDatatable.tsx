import {
  Column,
  DateLabel,
  EntityDataTable,
  EntityDataTableProps,
} from '@/components'
import { AdjustmentNote } from '../models/adjusment-note'
import { AdjustmentNoteQuery } from '../models/adjusment-note-query'
import { toCurrency } from '@/lib/utils/utils'
import { LinkToLoan } from '@/features/loans'
import { adjustmentNoteClient } from '../services/adjustmentNoteClient'
import { adjustmentNoteCacheKey } from '../lib/constants'

type AdjustmentDatatableProps = EntityDataTableProps<
  AdjustmentNote,
  AdjustmentNoteQuery
>

const columns: Column<AdjustmentNote>[] = [
  { id: 'id', accessorKey: 'id', header: 'Id', enableSorting: true },
  { id: 'type', accessorKey: 'type', header: 'Tipo', enableSorting: true },
  {
    id: 'amount',
    accessorKey: 'amount',
    header: 'Monto',
    enableSorting: true,
    cell: ({ row }) => toCurrency(row.original.amount),
  },
  {
    id: 'loanId',
    accessorKey: 'loanId',
    header: 'Préstamo',
    cell: ({ row }) => <LinkToLoan id={row.original.loanId} />,
  },
  {
    id: 'date',
    accessorKey: 'date',
    header: 'Fecha',
    cell: ({ row }) => <DateLabel date={row.original.date} />,
  },
]

const AdjustmentDatatable = ({ ...props }: AdjustmentDatatableProps) => {
  return (
    <EntityDataTable
      columns={columns}
      loader={adjustmentNoteClient.getNotes}
      title="Notas de Ajuste"
      cacheKey={adjustmentNoteCacheKey}
      {...props}
    />
  )
}

export default AdjustmentDatatable
