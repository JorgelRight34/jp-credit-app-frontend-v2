import {
  createContext,
  startTransition,
  useCallback,
  useContext,
  useState,
} from 'react'
import { useSearchParams } from '@/hooks/useSearchParams'

const TabsRouteValueContext = createContext<number | undefined>(undefined)
const TabsRouteActionsContext = createContext<
  ((tab: number) => void) | undefined
>(undefined)
const TabsRouteUnreactiveContext = createContext<number | undefined>(undefined)

export type TabsRouterProviderProps = {
  children: React.ReactNode
  defaultActive?: number
}

export function TabsRouterProvider({
  children,
  defaultActive = 0,
}: TabsRouterProviderProps) {
  const search = useSearchParams('tab')
  const reactiveActiveRoute = Number(search.get('tab')) ?? defaultActive
  const [unreactiveActiveRoute] = useState(
    () => reactiveActiveRoute ?? defaultActive,
  )

  const setActiveRoute = useCallback(
    (tab: number) => {
      startTransition(() => {
        search.set('tab', tab.toString())
        window.history.replaceState(null, '', `?${search.toString()}`)
      })
    },
    [search],
  )

  return (
    <TabsRouteValueContext.Provider value={reactiveActiveRoute}>
      <>pre: {reactiveActiveRoute}</>
      <TabsRouteActionsContext.Provider value={setActiveRoute}>
        <TabsRouteUnreactiveContext.Provider value={unreactiveActiveRoute}>
          {children}
        </TabsRouteUnreactiveContext.Provider>
      </TabsRouteActionsContext.Provider>
    </TabsRouteValueContext.Provider>
  )
}

export const useActiveTabRoute = () => {
  const context = useContext(TabsRouteValueContext)
  if (context === undefined)
    throw new Error('useActiveTabRoute must be inside provider')
  return context
}

export const useSetActiveTabRoute = () => {
  const context = useContext(TabsRouteActionsContext)
  if (context === undefined)
    throw new Error('useSetActiveTabRoute must be inside provider')
  return context
}

export const useUnreactiveActiveTabRoute = () => {
  const context = useContext(TabsRouteUnreactiveContext)
  if (context === undefined)
    throw new Error('useUnreactiveActiveTabRoute must be inside provider')
  return context
}

export default TabsRouterProvider
