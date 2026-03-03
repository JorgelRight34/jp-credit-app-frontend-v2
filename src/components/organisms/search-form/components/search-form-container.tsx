import type { Query, SearchFormConfig } from '../../search-form'
import SearchForm from '../../search-form/components/search-form'
import { PropsWithChildren } from 'react'
import { SearchFormProvider } from '../providers/search-form-provider'

export interface SearchFormContainerProps<
  T extends Query,
> extends PropsWithChildren {
  searchConfig: SearchFormConfig<T>
  initialQuery?: Partial<T>
}

export type SearchFormContainerOverrides<TQuery extends Query> = Partial<
  SearchFormContainerProps<TQuery>
>

const SearchFormContainer = <TQuery extends Query>({
  searchConfig,
  initialQuery,
  children,
}: SearchFormContainerProps<TQuery>) => {
  return (
    <SearchFormProvider initialQuery={initialQuery}>
      <section className="flex flex-col w-full">
        <div className="mb-3">
          <SearchForm
            options={searchConfig.options}
            defaultValues={initialQuery}
            advanced={searchConfig.advanced}
            schema={searchConfig.schema}
            onExport={searchConfig.onExport}
          />
        </div>
        <div>{children}</div>
      </section>
    </SearchFormProvider>
  )
}

export default SearchFormContainer
