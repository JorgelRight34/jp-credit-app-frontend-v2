import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
  useTransition,
} from 'react'

type TabsActiveIndexContextType = [
  number,
  (value: number, unmountOnExit?: boolean) => void,
]
type TabsActivePanelIndexContextType = [
  number,
  (value: number) => void,
  boolean,
]

interface ProviderProps extends PropsWithChildren {
  defaultActiveKey?: number
  onSelect?: (index: number) => void
}

export const TabsActiveIndexContext =
  createContext<TabsActiveIndexContextType | null>(null)

export const TabsActivePanelIndexContext =
  createContext<TabsActivePanelIndexContextType | null>(null)

export const TabsProvider = ({
  children,
  defaultActiveKey,
  onSelect,
}: ProviderProps) => {
  return (
    <TabsActivePanelIndexProvider defaultActiveKey={defaultActiveKey}>
      <TabsActiveIndexProvider
        defaultActiveKey={defaultActiveKey}
        onSelect={onSelect}
      >
        {children}
      </TabsActiveIndexProvider>
    </TabsActivePanelIndexProvider>
  )
}

export const TabsActiveIndexProvider = ({
  children,
  defaultActiveKey = 0,
  onSelect,
}: ProviderProps) => {
  const [, setActivePanelIndex] = useTabsActivePanelIndex()
  const [index, setIndex] = useState(defaultActiveKey)
  const [, startTransition] = useTransition()

  const handleSetIndex = useCallback(
    (value: number) => {
      setIndex(value)
      onSelect?.(value)
      startTransition(() => {
        setActivePanelIndex(value) // deferred — heavy panel renders later
      })
    },
    [onSelect],
  )

  return (
    <TabsActiveIndexContext.Provider value={[index, handleSetIndex]}>
      {children}
    </TabsActiveIndexContext.Provider>
  )
}

export const TabsActivePanelIndexProvider = ({
  children,
  defaultActiveKey = 0,
}: ProviderProps) => {
  const [index, setIndex] = useState(defaultActiveKey)

  const handleSetIndex = useCallback((value: number) => {
    setIndex(value)
  }, [])

  return (
    <TabsActivePanelIndexContext.Provider
      value={[index, handleSetIndex, false]}
    >
      {children}
    </TabsActivePanelIndexContext.Provider>
  )
}
export const useTabsActiveIndex = () => {
  const context = useContext(TabsActiveIndexContext)
  if (!context)
    throw new Error(
      'useTabsActiveIndex must be used within TabsActiveIndexProvider',
    )
  return context
}

export const useTabsActivePanelIndex = () => {
  const context = useContext(TabsActivePanelIndexContext)
  if (!context)
    throw new Error(
      'useTabsActivePanelIndex must be used within TabsActivePanelIndexProvider',
    )
  return context
}
