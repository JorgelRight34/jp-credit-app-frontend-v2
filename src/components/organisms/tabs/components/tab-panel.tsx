import { PropsWithChildren } from 'react'
import TabsPanelContainer from './tabs-panel-container'
import { useTabsActivePanelIndex } from '../providers/tabs-provider'

interface TabPanelProps extends PropsWithChildren {
  index: number
  eventKey?: string
  className?: string
  unmountOnExit?: boolean
}

const TabPanel = ({
  className,
  index,
  unmountOnExit,
  children,
}: TabPanelProps) => {
  const [activeIndex, , isPending] = useTabsActivePanelIndex()

  return (
    <TabsPanelContainer
      index={index}
      className={className}
      unmountOnExit={unmountOnExit}
    >
      {activeIndex === index && isPending ? null : children}
    </TabsPanelContainer>
  )
}

export default TabPanel
