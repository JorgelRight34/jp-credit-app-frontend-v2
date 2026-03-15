import { startTransition, useMemo } from 'react'
import clsx from 'clsx'
import type { TableBuilderProps } from './table-builder'
import type { Table } from '@tanstack/react-table'
import type { PageSize } from '../models/pageSize'
import { PageSizeSelector, Pagination } from '@/components/molecules'
import { Subtitle } from '@/components/atoms'

interface TableNavigationProps<TData> {
  table: Table<TData>
  totalItems?: number
  infinitePagination?: TableBuilderProps<TData>['infinitePagination']
  className?: string
  onLimitChange?: (limit: PageSize) => void
}

const TableNavigation = <TData,>({
  table,
  totalItems = 0,
  className,
  onLimitChange,
}: TableNavigationProps<TData>) => {
  const pagination = table.getState().pagination
  const pageSize = pagination.pageSize
  const page = pagination.pageIndex + 1
  const currentRows = table.getRowModel().rows.length

  const totalPages = useMemo(
    () => Math.ceil(totalItems / pageSize),
    [totalItems, pageSize],
  )

  const handlePageSizeChange = (val: number) => {
    table.setPageSize(val)
    startTransition(() => onLimitChange?.(val))
  }

  return (
    <div className={clsx('w-full rounded-b-xl bg-surface', className)}>
      <div className="w-full gap-3 flex flex-col justify-center p-3 py-2 md:flex-row md:items-center md:justify-between">
        <Subtitle className="hidden md:inline">
          Mostrando {currentRows} / {totalItems} de la página {page} /{' '}
          {totalPages}
        </Subtitle>
        <div className="flex flex-wrap items-center justify-end gap-3">
          {/* Items per page selector */}
          <div className="hidden md:flex items-center flex-shrink-0">
            <PageSizeSelector
              onChange={(val) => handlePageSizeChange(+val)}
              value={pageSize}
            />
          </div>
          <div className="flex flex-col items-start flex-shrink-0 gap-2 min-w-0">
            <Pagination
              count={totalPages}
              page={table.getState().pagination.pageIndex + 1}
              onChange={(_, val) => table.setPageIndex(val - 1)}
            />
            <div className="w-full flex justify-end">
              <Subtitle className="flex text-sm md:hidden">
                Mostrando {currentRows} / {totalItems} de la página {page} /{' '}
                {totalPages}
              </Subtitle>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TableNavigation
