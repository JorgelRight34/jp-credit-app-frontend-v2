import { useDeferredValue } from 'react'
import { useSearchContainer } from '../hooks/useSearchContainer'
import SearchForm from './search-form'
import type { ReactNode } from 'react'
import type { SearchFormConfig } from '../models/searchFormOption'
import type { Query } from '../models/query'

export interface SearchContainerProps<T extends Query> {
  search: SearchFormConfig<T>
  initialValues?: Partial<T>
  render: (q: T) => ReactNode
}

const SearchContainer = <T extends Query>({
  initialValues,
  search,
  render,
}: SearchContainerProps<T>) => {
  const [controlledQuery, onSearchSubmit] = useSearchContainer<T>(
    initialValues as T,
  )
  const deferredQuery = useDeferredValue(controlledQuery)

  return (
    <section>
      <div className="mb-3">
        <SearchForm
          onSubmit={onSearchSubmit}
          options={search.options}
          initialValues={initialValues}
          advanced={search.advanced}
          schema={search.schema}
        />
      </div>
      <div>{render(deferredQuery)}</div>
    </section>
  )
}

export default SearchContainer
