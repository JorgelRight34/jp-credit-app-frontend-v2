import { collateralIconByTypeMap } from '../jsx-utils'
import type { Collateral } from '../../models/collateral'
import type { BreadcrumbSpec } from '@/components'
import { CollateralIcon } from '@/components'

export const collateralsBreadcrumb: BreadcrumbSpec = {
  title: 'Garantías',
  icon: () => <CollateralIcon />,
  pathname: '/collaterals',
}

export const createCollateralBreadcrumb = (
  collateral: Collateral,
): BreadcrumbSpec => ({
  title: collateral.title,
  icon: collateralIconByTypeMap[collateral.type],
  pathname: '/collaterals/$id',
  params: { id: collateral.id.toString() },
})
