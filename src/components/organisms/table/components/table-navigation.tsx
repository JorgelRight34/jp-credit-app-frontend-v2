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
      <div className="flex w-full flex-col justify-center p-3 py-2 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <Subtitle>
            <span className="hidden md:inline">
              Mostrando {currentRows} / {totalItems} de la página {page} /{' '}
              {totalPages}
            </span>
            <span className="inline md:hidden">
              {currentRows} / {totalItems} | pág {page}
            </span>
          </Subtitle>
          <span className="inline md:hidden">
            <PageSizeSelector
              onChange={(val) => handlePageSizeChange(+val)}
              value={pageSize}
            />
          </span>
        </div>
        <div className="flex flex-col flex-wrap items-center justify-end gap-3 md:flex-row md:justify-center">
          {/* Items per page selector */}
          <div className="hidden flex-shrink-0 md:block">
            <PageSizeSelector
              onChange={(val) => handlePageSizeChange(+val)}
              value={pageSize}
            />
          </div>
          <div className="mt-3 flex flex-shrink-0 items-center md:!mt-0">
            <Pagination
              count={totalPages}
              page={table.getState().pagination.pageIndex + 1}
              onChange={(_, val) => table.setPageIndex(val - 1)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TableNavigation
