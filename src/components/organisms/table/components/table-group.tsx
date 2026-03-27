import { ReactNode } from 'react'
import {
  Column,
  PageSize,
  Table,
  TableBodyCompositor,
  TableFooterCompositor,
  TableHeaderCompositor,
  TableNavigation,
  useTableState,
} from '..'
import { TableBuilderProps } from './table-builder'
import TableCompositor from './table-container'
import TableStateWrapper from './table-state-wrapper'

type TableGroupTableProps<T> = {
  table: ReturnType<typeof useTableState<T>>
}

interface GroupedTableProps<T> extends TableBuilderProps<T> {
  groups: Array<Array<T>>
  groupPageSize?: PageSize
  getGroupColumns: (group: Array<T>, index: number) => Array<Column<T>>
  render?: ({ table }: TableGroupTableProps<T>) => ReactNode
}

const GroupedTable = <T,>({
  totalItems,
  infinitePagination,
  groups,
  groupPageSize,
  getGroupColumns,
  render = TableGroupTable,
  onLimitChange,
  ...config
}: GroupedTableProps<T>) => {
  const table = useTableState(config)

  return (
    <TableCompositor
      navigation={
        <TableNavigation
          table={table}
          totalItems={totalItems}
          infinitePagination={infinitePagination}
          onLimitChange={onLimitChange}
        />
      }
    >
      <Table>
        <TableHeaderCompositor table={table} />
        {groups.map((group, index) => (
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

export const TableGroupTable = <T,>({ table }: TableGroupTableProps<T>) => {
  return (
    <>
      <TableBodyCompositor table={table} />
      <TableFooterCompositor
        className="[display:table-header-group] border-t border-b"
        table={table}
      />
    </>
  )
}

export default GroupedTable
