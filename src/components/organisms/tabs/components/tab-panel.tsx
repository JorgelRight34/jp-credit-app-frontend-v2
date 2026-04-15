import { PropsWithChildren } from 'react'
import TabPanelContainer from './tab-panel-container'

interface TabPanelProps extends PropsWithChildren {
  index: number
  eventKey?: string
  className?: string
  unmountOnExit?: boolean
}

const TabPanel = ({ className, index, children }: TabPanelProps) => (
  <TabPanelContainer index={index} className={className}>
    {children}
  </TabPanelContainer>
)

export default TabPanel
