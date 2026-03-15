import { PropsWithChildren } from 'react'
import TabsPanelContainer from './tabs-panel-container'

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
  return (
    <TabsPanelContainer
      index={index}
      className={className}
      unmountOnExit={unmountOnExit}
    >
      {children}
    </TabsPanelContainer>
  )
}

export default TabPanel
