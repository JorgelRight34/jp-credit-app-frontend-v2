import clsx from 'clsx'
import { HTMLAttributes, useRef } from 'react'
import { useTabsActivePanelIndex } from '../providers/tabs-provider'

interface TabsPanelContainerProps extends HTMLAttributes<HTMLDivElement> {
  index: number
  unmountOnExit?: boolean
}

const TabsPanelContainer = ({
  children,
  index,
  className,
  unmountOnExit = true,
}: TabsPanelContainerProps) => {
  const [activeIndex] = useTabsActivePanelIndex()
  const hasBeenActiveRef = useRef(false)

  const isActive = activeIndex === index

  if (isActive) hasBeenActiveRef.current = true

  if (!isActive && !hasBeenActiveRef.current) return null

  if (!isActive && hasBeenActiveRef.current && unmountOnExit) return null

  return (
    <div
      className={clsx(
        'bg-background fade-in flex-1 h-full hidden pt-3',
        className,
        isActive && '!block',
      )}
    >
      {children}
    </div>
  )
}

export default TabsPanelContainer
