import {
  useActiveTabRoute,
  useSetActiveTabRoute,
} from '../providers/tabs-router-provider'
import Tabs from './tabs'
import type { TabsProps } from './tabs'

export type TabsRouterProps = Omit<TabsProps, 'defaultActiveKey'>

const TabsRouter = ({ children }: TabsRouterProps) => {
  const defaultActiveKey = useActiveTabRoute()
  const setActiveRoute = useSetActiveTabRoute()

  return (
    <Tabs defaultActiveIndex={defaultActiveKey} onSelect={setActiveRoute}>
      {children}
    </Tabs>
  )
}

export default TabsRouter
