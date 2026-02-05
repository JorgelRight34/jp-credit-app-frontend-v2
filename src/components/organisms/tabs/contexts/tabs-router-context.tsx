import { createContext, useCallback, useContext, useState } from 'react'
import { useSearchParams } from '@/hooks/useSearchParams'

const TabsRouteValueContext = createContext<string | undefined>(undefined)
const TabsRouteActionsContext = createContext<
  ((tab: string | null) => void) | undefined
>(undefined)
const TabsRouteUnreactiveContext = createContext<string | undefined>(undefined)

export type TabsRouterProviderProps = {
  children: React.ReactNode
  defaultActive: string
}

export function TabsRouterProvider({
  children,
  defaultActive,
}: TabsRouterProviderProps) {
  const search = useSearchParams()
  const activeRoute = search.get('tab') ?? defaultActive
  const [defaultActiveRoute] = useState(
    () => search.get('tab') ?? defaultActive,
  )

  const setActiveRoute = useCallback(
    (tab: string | null) => {
      if (!tab) return

      search.set('tab', tab)
      window.history.replaceState(null, '', `?${search.toString()}`)
    },
    [search],
  )

  return (
    <TabsRouteValueContext.Provider value={activeRoute}>
      <TabsRouteActionsContext.Provider value={setActiveRoute}>
        <TabsRouteUnreactiveContext.Provider value={defaultActiveRoute}>
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
