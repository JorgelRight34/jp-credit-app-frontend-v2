import type { BreadcrumbSpec } from '@/components'
import { GroupsIcon } from '@/components'

export const profilesBreadcrumb: BreadcrumbSpec = {
  title: 'Pérfiles',
  icon: () => <GroupsIcon />,
  pathname: '/profiles',
}
