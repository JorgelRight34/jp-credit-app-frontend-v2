import { HTMLAttributes } from 'react'

const TabsPanelContainer = ({
  children,
  className,
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={`bg-background h-full pt-3 ${className}`}>{children}</div>
  )
}

export default TabsPanelContainer
