import clsx from 'clsx'
import type { ReactNode } from 'react'
import { TabsProvider } from '../providers/tabs-provider'

export interface TabsProps {
  children: ReactNode
  className?: string
  defaultActiveIndex?: number
  onSelect?: (val: number) => void
}

const Tabs = ({
  className,
  defaultActiveIndex = 0,
  children,
  onSelect,
}: TabsProps) => {
  return (
    <div className={clsx('flex flex-col h-full', className)}>
      <TabsProvider defaultActiveKey={defaultActiveIndex} onSelect={onSelect}>
        {children}
      </TabsProvider>
    </div>
  )
}

export default Tabs
