import { TableBuilder, TableBuilderProps } from '@/components'
import { useData } from '@/hooks/useData'
import { CacheKey } from '@/models'

interface TableWithDataLoaderBuilderProps<T> extends Omit<
  TableBuilderProps<T>,
  'data'
> {
  cacheKey: CacheKey
  loader: () => Promise<Array<T>>
}

const TableWithDataLoaderBuilder = <T,>({
  columns,
  cacheKey,
  loader,
  ...props
}: TableWithDataLoaderBuilderProps<T>) => {
  const { data } = useData({ key: cacheKey, loader })

  return <TableBuilder columns={columns} data={data} {...props} />
}

export default TableWithDataLoaderBuilder
