import TableBodyCompositor from './table-body-compositor'
import TableDataCell from './table-data-cell'
import TableFooter from './table-footer'
import TableFooterCompositor from './table-footer-compositor'
import TableNavigation from './table-navigation'
import TableRow from './table-row'
import type { TableRenderProps } from './table-state-wrapper'

const TableGroupTable = <T,>({ table }: TableRenderProps<T>) => {
  return (
    <>
      <TableBodyCompositor table={table} />
      <TableFooterCompositor
        className="[display:table-header-group]"
        table={table}
      />
      <TableFooter className="!m-0 [display:table-header-group] border-none !p-0">
        <TableRow className="!m-0 border-none !p-0">
          <TableDataCell
            colSpan={table.getVisibleFlatColumns().length}
            className="!m-0 border-none !p-0 align-top"
          >
            <div className="w-full">
              <TableNavigation
                table={table}
                className="w-full"
                pageSize={table.getState().pagination.pageSize}
                totalItems={table.options.data.length}
              />
            </div>
          </TableDataCell>
        </TableRow>
      </TableFooter>
    </>
  )
}

export default TableGroupTable
