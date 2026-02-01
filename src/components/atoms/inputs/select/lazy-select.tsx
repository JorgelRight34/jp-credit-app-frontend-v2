import SelectInput from './select'
import type { SelectOptions } from './select-option'
import type { SelectInputProps } from './select'
import type { CacheKey } from '@/models'
import { useData } from '@/hooks/useData'

export type LazySelectInputProps = Omit<SelectInputProps, 'options'> & {
  cacheKey: CacheKey
  loader: () => Promise<SelectOptions>
}

const LazySelect = ({ cacheKey, loader, ...props }: LazySelectInputProps) => {
  const { data } = useData({
    key: cacheKey,
    loader,
  })

  return <SelectInput {...props} options={data ?? []} />
}

export default LazySelect
