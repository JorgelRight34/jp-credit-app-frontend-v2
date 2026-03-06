import { Tabs as RTabs, TabPanel } from 'react-tabs'
import clsx from 'clsx'
import { useTabs } from '../hooks/useTabs'
import Tab from './tab'
import type { UseTabsProps } from '../hooks/useTabs'
import type { ReactNode } from 'react'
import 'react-tabs/style/react-tabs.css'
import { variations, type VariationKey } from '../lib/variations'
import TabList from './tab-list'

export interface TabsProps extends UseTabsProps {
  children: ReactNode
  tabListClassName?: string
  tabClassName?: string
  tabPanelClassName?: string
  className?: string
  variation?: VariationKey
  navigate?: boolean
}

const Tabs = ({
  className,
  tabListClassName,
  tabClassName,
  tabPanelClassName,
  variation = 'default',
  children,
  ...props
}: TabsProps) => {
  const { activeIndex, tabsArray, renderedTabs, isPending, handleOnSelect } =
    useTabs({
      children,
      ...props,
    })

  return (
    <div className={clsx('h-full bg-surface', className)}>
      <RTabs
        selectedIndex={activeIndex}
        onSelect={(tab) => {
          handleOnSelect(tab)
        }}
        selectedTabClassName="text-accent"
        className="react-tabs flex h-full flex-col"
      >
        <div className={variations[variation].container}>
          <TabList variation={variation} className={tabListClassName}>
            {tabsArray.map((tab, index) => (
              <Tab
                variation={variation}
                className={tabClassName}
                {...tab.props}
                isActive={index === activeIndex}
                key={index}
              >
                {tab.props.title}
              </Tab>
            ))}
          </TabList>
        </div>

        {tabsArray.map((tab, index) => (
          <TabPanel
            className={`react-tabs__tab-panel h-full bg-background pt-3 ${variations[variation].container}`}
            key={index}
            forceRender={renderedTabs[index]}
          >
            <div className={clsx('fade-in h-full flex-1', tabPanelClassName)}>
              {activeIndex === index && isPending ? null : tab.props.children}
            </div>
          </TabPanel>
        ))}
      </RTabs>
    </div>
  )
}

export default Tabs
