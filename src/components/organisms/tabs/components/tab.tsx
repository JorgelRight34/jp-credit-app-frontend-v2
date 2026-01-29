import { Tab as RTab } from 'react-tabs'
import type { TabProps as RTabProps } from 'react-tabs'
import type { ReactNode } from 'react'
import type { IconName } from '@/components/atoms/icon/iconName'
import { Icon } from '@/components/atoms'

export type TabProps = Omit<RTabProps, 'title'> & {
  eventKey?: string
  title?: ReactNode
  active?: boolean
  icon?: IconName
}

const Tab = ({ title, icon, ...props }: TabProps) => {
  return (
    <RTab {...props}>{icon ? <Icon icon={icon}>{title}</Icon> : title}</RTab>
  )
}

Object.assign(Tab, RTab)

export default Tab
