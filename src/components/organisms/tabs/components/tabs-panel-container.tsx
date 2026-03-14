import clsx from 'clsx'
import { HTMLAttributes, useRef } from 'react'
import { useTabsActivePanelIndex } from '../providers/tabs-provider'
import { Panel } from '@/components/atoms'

interface TabsPanelContainerProps extends HTMLAttributes<HTMLDivElement> {
  index: number
  unmountOnExit?: boolean
}

const TabsPanelContainer = ({
  children,
  index,
  className,
  unmountOnExit = false,
}: TabsPanelContainerProps) => {
  const [activeIndex] = useTabsActivePanelIndex()
  const hasBeenActiveRef = useRef(false)

  const isActive = activeIndex === index

  if (isActive) hasBeenActiveRef.current = true

  if (!isActive && !hasBeenActiveRef.current) return null

  if (!isActive && hasBeenActiveRef.current && unmountOnExit) return null

  return (
    <Panel className={clsx('hidden', className, isActive && '!block')}>
      {children}
    </Panel>
  )
}

export default TabsPanelContainer
