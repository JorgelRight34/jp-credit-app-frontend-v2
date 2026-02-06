import { useTableState } from '../hooks/useTableState'
import type { UseTableStateProps } from '../hooks/useTableState'
import type { Table } from '@tanstack/react-table'
import type { ReactNode } from 'react'

export type TableRenderProps<T> = {
  table: Table<T>
}

export type TableStateWrapperProps<T> = UseTableStateProps<T> & {
  render: ({ table }: TableRenderProps<T>) => ReactNode
}

const TableStateWrapper = <T,>({
  data,
  pageSize,
  render,
  ...config
}: TableStateWrapperProps<T>) => {
  const { table } = useTableState({
    data,
    pageSize,
    ...config,
  })

  console.log(`TableStateWrapper render ${typeof window}`)

  return render({ table })
}

export default TableStateWrapper
