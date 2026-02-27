import { ReactNode } from 'react'
import {
  PageSize,
  TableBodyCompositor,
  TableDataCell,
  TableFooter,
  TableFooterCompositor,
  TableHeaderCompositor,
  TableNavigation,
  TableRow,
  useTableState,
} from '..'
import { TableBuilderProps } from './table-builder'
import TableCompositor from './table-compositor'
import TableStateWrapper from './table-state-wrapper'

type TableGroupTableProps<T> = {
  table: ReturnType<typeof useTableState<T>>
}

interface GroupedTableProps<T> extends TableBuilderProps<T> {
  groups: Array<Array<T>>
  groupPageSize?: PageSize
  render?: ({ table }: TableGroupTableProps<T>) => ReactNode
}

const GroupedTable = <T,>({
  columns,
  totalItems,
  infinitePagination,
  groups,
  groupPageSize,
  render = TableGroupTable,
  onLimitChange,
  ...config
}: GroupedTableProps<T>) => {
  const table = useTableState({ data: groups.flat(), columns, ...config }) // AVOID FLAT

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
      <TableHeaderCompositor table={table} />
      {groups.map((group, index) => (
        <TableStateWrapper
          key={index}
          columns={columns}
          data={group}
          pageSize={groupPageSize}
          render={(table) => render({ table })}
        />
      ))}
      <TableFooterCompositor table={table} />
    </TableCompositor>
  )
}

export const TableGroupTable = <T,>({ table }: TableGroupTableProps<T>) => {
  return (
    <>
      <TableBodyCompositor table={table} />
      <TableFooterCompositor
        className="[display:table-header-group]"
        table={table}
      />
      <TableFooter className="!m-0 [display:table-header-group] border-y !p-0">
        <TableRow className="!m-0 border-none !p-0">
          <TableDataCell
            colSpan={table.getVisibleFlatColumns().length}
            className="!m-0 border-none !p-0 align-top"
          >
            <div className="w-full">
              <TableNavigation
                table={table}
                className="w-full"
                totalItems={table.options.data.length}
              />
            </div>
          </TableDataCell>
        </TableRow>
      </TableFooter>
    </>
  )
}

export default GroupedTable
