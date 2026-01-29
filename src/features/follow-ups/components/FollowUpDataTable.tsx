import {
  Column,
  DateLabel,
  EntityDataTable,
  EntityDataTableProps,
} from '@/components'
import { FollowUp } from '../models/followUp'
import { FollowUpQuery } from '../models/followUpQuery'
import { LinkToProfile } from '@/features/profiles'
import { LinkToLoan } from '@/features/loans'
import { sortDateRows } from '@/lib/utils/utils'
import { useRouter } from 'next/router'
import { followUpsCacheKey } from '../lib/constants'
import { followUpClient } from '../services/followUpClient'

type FollowUpDataTableProps = EntityDataTableProps<FollowUp, FollowUpQuery>

const columns: Column<FollowUp>[] = [
  { accessorKey: 'id', header: '#', enableSorting: true },

  {
    accessorFn: (row) => row.clientFullName,
    header: 'Cliente',
    cell: ({ row }) => <LinkToProfile profile={row.original.clientFullName} />,
  },
  {
    accessorFn: (row) => row.body[0],
    header: 'Cuerpo',
    enableSorting: true,
    cell: ({ row }) => (
      <span className="w-[200px]truncate block">{row.original.body}</span>
    ),
  },
  {
    accessorKey: 'loanId',
    header: 'Prestamo',
    enableSorting: true,
    cell: ({ row }) => <LinkToLoan id={row.original.loanId} />,
  },
  {
    accessorKey: 'createdAt',
    header: 'Fecha',
    sortingFn: sortDateRows,
    enableSorting: true,
    cell: ({ row }) => <DateLabel date={row.original.date} />,
  },
]

const FollowUpDataTable = ({ query, ...props }: FollowUpDataTableProps) => {
  const router = useRouter()

  return (
    <EntityDataTable
      cacheKey={followUpsCacheKey}
      query={query}
      title="Seguimiento"
      loader={followUpClient.getFollowUps}
      columns={columns}
      onRowClick={(f) => router.push(`/follow-ups/${f.id}`)}
      onExpand={(row) => (
        <div>
          <p>{row.original.body}</p>
        </div>
      )}
      {...props}
    />
  )
}

export default FollowUpDataTable
