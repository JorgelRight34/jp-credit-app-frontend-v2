import type { InitialTableState } from '../hooks/useTableState'
import type { Query, SearchFormConfig } from '../../search-form'
import { useSearchContainer } from '../../search-form/hooks/useSearchContainer'
import SearchForm from '../../search-form/components/search-form'
import { Column, Table } from '..'

export type TableAndFormContainerProps<
  TEntity extends object,
  T extends Query,
> = {
  searchConfig: SearchFormConfig<T>
  columns: Array<Column<TEntity>>
  initialQuery?: Partial<T>
  initialState?: InitialTableState<TEntity>
  loader: (query: T) => Array<TEntity>
}

export type TableAndFormContainerOverrides<
  T extends object,
  TQuery extends Query,
> = Partial<TableAndFormContainerProps<T, TQuery>>

const TableAndFormContainer = <TEntity extends object, TQuery extends Query>({
  columns,
  searchConfig,
  initialQuery,
  loader,
}: TableAndFormContainerProps<TEntity, TQuery>) => {
  const [controlledQuery, onSearchSubmit] = useSearchContainer(
    (initialQuery ?? {}) as TQuery,
  )

  return (
    <section className="flex flex-col w-full">
      <div className="mb-3">
        <SearchForm
          onSubmit={onSearchSubmit}
          options={searchConfig.options}
          defaultValues={searchConfig.defaultValues}
          advanced={searchConfig.advanced}
          schema={searchConfig.schema}
        />
      </div>
      <div>
        <Table columns={columns} data={loader(controlledQuery)} />
      </div>
    </section>
  )
}

export default TableAndFormContainer
