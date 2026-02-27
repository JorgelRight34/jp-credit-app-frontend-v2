import type { Query, SearchFormConfig } from '../../search-form'
import { useSearchContainer } from '../../search-form/hooks/useSearchContainer'
import SearchForm from '../../search-form/components/search-form'
import { ReactNode } from 'react'

export interface SearchFormContainerProps<T extends Query> {
  searchConfig: SearchFormConfig<T>
  initialQuery?: Partial<T>
  render: (query: T) => ReactNode
}

export type SearchFormContainerOverrides<TQuery extends Query> = Partial<
  SearchFormContainerProps<TQuery>
>

const SearchFormContainer = <TQuery extends Query>({
  searchConfig,
  initialQuery,
  render,
}: SearchFormContainerProps<TQuery>) => {
  const [controlledQuery, onSearchSubmit] = useSearchContainer(
    (initialQuery ?? {}) as TQuery,
  )

  return (
    <section className="flex flex-col w-full">
      <div className="mb-3">
        <SearchForm
          onSubmit={onSearchSubmit}
          options={searchConfig.options}
          initialValues={initialQuery}
          defaultValues={searchConfig.defaultValues}
          advanced={searchConfig.advanced}
          schema={searchConfig.schema}
        />
      </div>
      <div>{render(controlledQuery)}</div>
    </section>
  )
}

export default SearchFormContainer
