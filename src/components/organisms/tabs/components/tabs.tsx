import { Tabs as RTabs, TabList, TabPanel } from 'react-tabs'
import clsx from 'clsx'
import { useTabs } from '../hooks/useTabs'
import { variations } from '../lib/variations'
import Tab from './tab'
import type { UseTabsProps } from '../hooks/useTabs'
import type { ReactNode } from 'react'
import 'react-tabs/style/react-tabs.css'
import type { VariationKey } from '../lib/variations'

interface EntityTabsProps extends UseTabsProps {
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
  variation,
  children,
  ...props
}: EntityTabsProps) => {
  const { activeIndex, tabsArray, renderedTabs, handleOnSelect } = useTabs({
    children,
    ...props,
  })
  const variationClasses = variations[variation ?? 'default']

  if (activeIndex === undefined) return null

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
        <TabList className={tabListClassName ?? variationClasses.list}>
          {tabsArray.map((tab, index) => (
            <Tab
              className={clsx(variationClasses.tab, tabClassName)}
              {...tab.props}
              isActive={index === activeIndex}
              key={index}
            >
              {tab.props.title}
            </Tab>
          ))}
        </TabList>
        {tabsArray.map((tab, index) => (
          <TabPanel
            className="react-tabs__tab-panel h-full"
            key={index}
            forceRender={renderedTabs.includes(index)}
          >
            <div className={clsx('fade-in  h-full flex-1', tabPanelClassName)}>
              {tab.props.children}
            </div>
          </TabPanel>
        ))}
      </RTabs>
    </div>
  )
}

export default Tabs
