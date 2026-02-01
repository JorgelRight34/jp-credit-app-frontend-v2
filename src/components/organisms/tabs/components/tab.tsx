import { Tab as RTab } from 'react-tabs'
import clsx from 'clsx'
import type { TabProps as RTabProps } from 'react-tabs'
import type { ReactNode } from 'react'
import type { IconName } from '@/components/atoms/icon/iconName'
import { Icon } from '@/components/atoms'

export type TabProps = Omit<RTabProps, 'title'> & {
  eventKey?: string
  title?: ReactNode
  isActive?: boolean
  icon?: IconName
}

const Tab = ({
  title,
  eventKey,
  icon,
  className,
  isActive,
  ...props
}: TabProps) => {
  return (
    <RTab
      {...props}
      className={clsx(
        'w-fit cursor-pointer focus-visible:outline-none',
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
