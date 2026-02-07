import { Table } from '../../table'
import FilenameCell from './filename-cell'
import type { TableFile } from '../models/tableFile'
import type { Column } from '../../table/models/column'
import DateLabel from '@/components/atoms/date-label/date-label'
import { toFormattedDate } from '@/lib/utils'

interface FileTableProps {
  showLink?: boolean
  extraColumns?: Array<Column<TableFile>>
  files: Array<TableFile>
  showType?: boolean
  onPageChange?: (page: number) => void
}

const columns: Array<Column<TableFile>> = [
  {
    accessorKey: 'name',
    header: 'NOMBRE',
    enableSorting: true,
    cell: ({ row }) => <FilenameCell file={row.original} />,
  },
  {
    accessorKey: 'fileType',
    header: 'TIPO',
    enableSorting: true,
  },
  {
    accessorKey: 'lastModified',
    header: 'MODIFICADO',
    enableSorting: true,
    cell: ({ row }) =>
      row.original.lastModified
        ? toFormattedDate(row.original.lastModified)
        : '---',
  },
  {
    accessorKey: 'createdAt',
    header: 'CREADO',
    enableSorting: true,
    cell: ({ row }) =>
      row.original.createdAt ? (
        <DateLabel date={row.original.createdAt} />
      ) : (
        '---'
      ),
  },
]

const FileTable = ({ files = [], extraColumns = [] }: FileTableProps) => {
  return <Table columns={columns.concat(extraColumns)} data={files} />
}

export default FileTable
