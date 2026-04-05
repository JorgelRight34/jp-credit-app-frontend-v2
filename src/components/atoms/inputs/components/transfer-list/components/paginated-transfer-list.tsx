import { useMemo } from 'react'
import type { InputProps } from '@/components'
import { PaginatedListContainer, TransferList } from '@/components'
import { useDataWithPagination } from '@/hooks/useData'
import { PagedResponse } from '@/models'

interface PaginatedTransferListProps<T> extends InputProps {
  queryKey: unknown[]
  leftTitle?: string
  rightTitle?: string
  leftSubtitle?: string
  rightSubtitle?: string
  loader: (page: number) => Promise<PagedResponse<T>>
  mapItem: (item: T) => { id: string | number; label: string }
}

const PaginatedTransferList = <T,>({
  queryKey,
  loader,
  mapItem,
  leftTitle = 'Disponibles',
  rightTitle = 'Seleccionados',
  leftSubtitle,
  rightSubtitle,
  value = [],
  ...props
}: PaginatedTransferListProps<T>) => {
  const {
    result: { data },
    page,
    setPage,
  } = useDataWithPagination({
    key: queryKey,
    loader,
  })

  const items = useMemo(() => data?.items.map(mapItem) ?? [], [data, mapItem])

  if (!data) return null

  return (
    <PaginatedListContainer
      count={data.totalPages}
      page={page}
      onChange={(_, val) => setPage(val)}
    >
      <TransferList
        items={items}
        value={value}
        leftTitle={leftTitle}
        rightTitle={rightTitle}
        leftSubtitle={leftSubtitle}
        rightSubtitle={rightSubtitle}
        {...props}
      />
    </PaginatedListContainer>
  )
}

export default PaginatedTransferList
