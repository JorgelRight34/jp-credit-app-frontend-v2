import {
  useSetActiveTabRoute,
  useUnreactiveActiveTabRoute,
} from '../contexts/tabs-router-context'
import Tabs from './tabs'
import type { TabsProps } from './tabs'

export type TabsRouterProps = Omit<TabsProps, 'defaultActiveKey'>

const TabsRouter = ({ children }: TabsRouterProps) => {
  const defaultActiveKey = useUnreactiveActiveTabRoute()
  const setActiveRoute = useSetActiveTabRoute()

  return (
    <Tabs defaultActiveKey={defaultActiveKey} onSelect={setActiveRoute}>
      {children}
    </Tabs>
  )
}

export default TabsRouter
