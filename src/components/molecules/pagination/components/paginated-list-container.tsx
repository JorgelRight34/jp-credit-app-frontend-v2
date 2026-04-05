import { PropsWithChildren } from 'react'
import Pagination, { PaginationProps } from './pagination'
import { PagedResponse } from '@/models'

export type PaginatedListProps<T> = {
  data: PagedResponse<T>
  page: number
  setPage: (p: number) => void
}

const PaginatedListContainer = ({
  children,
  ...props
}: PropsWithChildren<PaginationProps>) => {
  return (
    <div className="flex flex-1 flex-col">
      {children}
      <div className="flex flex-shrink-0 justify-end pt-3">
        <Pagination {...props} />
      </div>
    </div>
  )
}

export default PaginatedListContainer
