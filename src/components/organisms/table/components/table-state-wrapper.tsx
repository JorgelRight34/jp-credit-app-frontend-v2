import { useTableState } from '../hooks/useTableState'
import type { UseTableStateProps } from '../hooks/useTableState'
import type { Table } from '@tanstack/react-table'
import type { ReactNode } from 'react'

export type TableStateWrapperProps<T> = UseTableStateProps<T> & {
  render: (table: Table<T>) => ReactNode
}

const TableStateWrapper = <T,>({
  data,
  pageSize,
  render,
  ...config
}: TableStateWrapperProps<T>) => {
  const table = useTableState({
    data,
    pageSize,
    ...config,
  })

  return render(table)
}

export default TableStateWrapper
