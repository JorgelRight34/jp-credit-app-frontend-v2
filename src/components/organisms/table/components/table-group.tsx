import { ReactNode } from 'react'
import {
  Column,
  PageSize,
  Table,
  TableBodyCompositor,
  TableFooterCompositor,
  TableHeaderCompositor,
  TableNavigation,
  TableRow,
  useTableState,
} from '..'
import { TableBuilderProps } from './table-builder'
import TableCompositor from './table-container'
import TableStateWrapper from './table-state-wrapper'

type TableGroupTableProps<T> = {
  table: ReturnType<typeof useTableState<T>>
}

interface GroupTableNavigationProps<T> extends Omit<
  TableBuilderProps<T>,
  'data' | 'getRowId'
> {
  data: Array<Array<T>> // Groups
}

interface GroupedTableProps<T> extends GroupTableNavigationProps<T> {
  groupPageSize?: PageSize
  getGroupColumns: (group: Array<T>, index: number) => Array<Column<T>>
  render?: ({ table }: TableGroupTableProps<T>) => ReactNode
}

const GroupedTable = <T,>({
  totalItems,
  infinitePagination,
  getGroupColumns,
  render = TableGroupTable,
  onLimitChange,
  data,
  pageSize,
  groupPageSize,
  ...config
}: GroupedTableProps<T>) => {
  const table = useTableState(config)

  return (
    <TableCompositor
      navigation={
        <GroupTableNavigation
          data={data}
          totalItems={totalItems}
          {...config}
          pageSize={pageSize}
        />
      }
    >
      <Table>
        {data.map((group, index) => (
          <TableStateWrapper
            key={index}
            columns={getGroupColumns(group, index)}
            data={group}
            pageSize={groupPageSize}
            render={(table) => render({ table })}
          />
        ))}
        <TableFooterCompositor table={table} />
      </Table>
    </TableCompositor>
  )
}

const GroupTableNavigation = <T,>({
  data,
  totalItems,
  ...config
}: GroupTableNavigationProps<T>) => {
  const table = useTableState<Array<T>>({ ...config, data, columns: [] })

  return <TableNavigation table={table} totalItems={totalItems} />
}

export const TableGroupTable = <T,>({ table }: TableGroupTableProps<T>) => {
  return (
    <>
      <TableHeaderCompositor table={table} />
      <TableBodyCompositor table={table} />
      <TableFooterCompositor
        className="[display:table-header-group] border-t border-b"
        table={table}
      />
      <TableRow>
        <td colSpan={9999} className="p-0">
          <TableNavigation
            table={table}
            totalItems={table.getPrePaginationRowModel().rows.length}
          />
        </td>
      </TableRow>
    </>
  )
}

export default GroupedTable
