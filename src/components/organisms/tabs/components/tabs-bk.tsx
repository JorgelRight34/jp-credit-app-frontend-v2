import { Tabs as RTabs, TabPanel } from 'react-tabs'
import clsx from 'clsx'
import { useTabs } from '../hooks/useTabs'
import Tab from './tab'
import type { UseTabsProps } from '../hooks/useTabs'
import type { ReactNode } from 'react'
import 'react-tabs/style/react-tabs.css'
import { type VariationKey } from '../lib/variations'
import TabsList from './tabs-list'
import TabsPanelContainer from './tabs-panel-container'

export interface TabsProps extends UseTabsProps {
  children: ReactNode
  tabListClassName?: string
  tabClassName?: string
  tabPanelClassName?: string
  className?: string
  variation?: VariationKey
  tabPanelContainerClassName?: string
}

const Tabs = ({
  className,
  tabListClassName,
  tabClassName,
  tabPanelClassName,
  tabPanelContainerClassName,
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
    <div className={clsx('h-full', className)}>
      <RTabs
        selectedIndex={activeIndex}
        onSelect={(tab) => {
          handleOnSelect(tab)
        }}
        selectedTabClassName="text-accent"
        className="react-tabs flex h-full flex-col"
      >
        <TabsList variation={variation} className={tabListClassName}>
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
        </TabsList>
        <TabsPanelContainer className={tabPanelClassName}>
          {tabsArray.map((tab, index) => (
            <TabPanel
              className={`react-tabs__tab-panel h-full`}
              key={index}
              forceRender={renderedTabs[index]}
            >
              <div className={clsx('fade-in h-full flex-1', tabPanelClassName)}>
                {activeIndex === index && isPending ? null : tab.props.children}
              </div>
            </TabPanel>
          ))}
        </TabsPanelContainer>
      </RTabs>
    </div>
  )
}

export default Tabs
