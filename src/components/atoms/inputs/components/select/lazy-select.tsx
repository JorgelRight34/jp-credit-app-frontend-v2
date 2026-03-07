import SelectInput from './select'
import type { SelectOptions } from './select-option'
import type { SelectInputProps } from './select'
import type { CacheKey } from '@/models'
import { useData } from '@/hooks/useData'

export type LazySelectInputProps = Omit<SelectInputProps, 'options'> & {
  cacheKey: CacheKey
  enabled?: boolean
  loader: () => Promise<SelectOptions>
}

const LazySelect = ({
  cacheKey,
  enabled,
  loader,
  ...props
}: LazySelectInputProps) => {
  const { data } = useData({
    key: cacheKey,
    loader,
    enabled,
  })

  return <SelectInput {...props} options={data ?? []} />
}

export default LazySelect
