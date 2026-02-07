import type { BreadcrumbSpec } from '@/components'
import { CollateralIcon } from '@/components'

export const collateralsBreadcrumb: BreadcrumbSpec = {
  title: 'Garantías',
  icon: () => <CollateralIcon />,
  pathname: '/collaterals',
}
