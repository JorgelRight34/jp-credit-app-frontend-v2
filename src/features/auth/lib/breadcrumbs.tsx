import type { BreadcrumbSpec } from '@/components'
import { LockIcon } from '@/components'

export const accessControlBreadcrumb: BreadcrumbSpec = {
  icon: () => <LockIcon />,
  title: 'Accesos',
  pathname: '/access-control',
}
