import { Tab as RTab } from 'react-tabs'
import clsx from 'clsx'
import type { TabProps as RTabProps } from 'react-tabs'
import type { ReactNode } from 'react'
import type { IconName } from '@/components/atoms/icon/models/iconName'
import { Icon } from '@/components/atoms'
import { VariationKey, variations } from '../lib/variations'

export type TabProps = Omit<RTabProps, 'title'> & {
  eventKey?: string
  title?: ReactNode
  isActive?: boolean
  forceRender?: boolean
  variation?: VariationKey
  icon?: IconName
}

const Tab = ({
  variation = 'default',
  title,
  eventKey,
  className,
  isActive,
  icon,
  ...props
}: TabProps) => {
  return (
    <RTab
      {...props}
      className={clsx(
        variations[variation].tab,
        'w-fit cursor-pointer focus-visible:outline-none text-secondary',
        className,
        {
          'border-b border-secondary-color text-accent-secondary': isActive,
        },
      )}
    >
      {icon ? <Icon icon={icon}>{title}</Icon> : title}
    </RTab>
  )
}

Object.assign(Tab, RTab)

export default Tab
