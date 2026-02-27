import { createContext, PropsWithChildren, ReactNode, useContext } from 'react'
import type { Query } from '../models/query'
import { useSearchContainer } from '../hooks/useSearchContainer'

/**
 * We intentionally keep these contexts non-generic (unknown) so the provider can be reused
 * with any TQuery. Consumers cast via the typed hooks below.
 */
const SearchFormValueContext = createContext<unknown>(null)
const SearchFormSubmitContext = createContext<unknown>(null)

interface SearchFormProviderProps extends PropsWithChildren {
  initialQuery?: Query
}

export const SearchFormProvider = ({
  initialQuery,
  children,
}: SearchFormProviderProps) => {
  const [value, submit] = useSearchContainer(initialQuery ?? {})

  return (
    <SearchFormSubmitContext.Provider value={submit}>
      <SearchFormValueContext.Provider value={value}>
        {children}
      </SearchFormValueContext.Provider>
    </SearchFormSubmitContext.Provider>
  )
}

/**
 * Consume the current search query value (typed).
 * Components using this hook will re-render when the query changes.
 */
export const useSearchFormValue = <TQuery extends Query>() => {
  const ctx = useContext(SearchFormValueContext)

  if (!ctx) {
    throw new Error(
      'useSearchFormValue must be used inside SearchFormContextProvider',
    )
  }

  return ctx as TQuery
}

/**
 * Consume the submit function (typed).
 * Components using this hook will NOT re-render when the query changes
 * (as long as submit is stable, e.g. useCallback in useSearchContainer).
 */
export const useSearchFormSubmit = <TQuery extends Query>() => {
  const ctx = useContext(SearchFormSubmitContext)

  if (!ctx) {
    throw new Error(
      'useSearchFormSubmit must be used inside SearchFormContextProvider',
    )
  }

  return ctx as (q: TQuery) => Promise<TQuery>
}

export const SearchFormValueConsumer = <TQuery extends Query>({
  render,
}: {
  render: (q: TQuery) => ReactNode
}) => {
  const value = useSearchFormValue<TQuery>()

  return render(value)
}
