import DataTable from './data-table'
import {
  SearchFormContainer,
  SearchFormValueConsumer,
  type Query,
} from '../../search-form'
import { DataTableContainerProps } from './data-table-container'
import { ElementType } from 'react'

export interface DataTableContainerWithGuardProps<
  TEntity extends object,
  T extends Query,
> extends DataTableContainerProps<TEntity, T> {
  shouldRender: (query: T) => boolean
  fallback: ElementType
}

const DataTableContainerWithGuard = <
  TEntity extends object,
  TQuery extends Query,
>({
  datatableConfig,
  initialData,
  searchConfig,
  initialQuery,
  shouldRender,
  fallback: Fallback,
  ...props
}: DataTableContainerWithGuardProps<TEntity, TQuery>) => {
  return (
    <SearchFormContainer
      searchConfig={searchConfig}
      initialQuery={initialQuery}
    >
      <SearchFormValueConsumer<TQuery>
        render={(query) =>
          shouldRender(query) ? (
            <DataTable<TEntity, TQuery>
              query={query}
              columns={datatableConfig.columns}
              loader={datatableConfig.loader}
              allowExpand={datatableConfig.allowExpand}
              onExpand={datatableConfig.onExpand}
              {...props}
            />
          ) : (
            <Fallback />
          )
        }
      />
    </SearchFormContainer>
  )
}

export default DataTableContainerWithGuard
