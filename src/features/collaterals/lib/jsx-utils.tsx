import type { CollateralType } from '../models/collateralType'
import type { IconName } from '@/components/atoms/icon/models/iconName'
import { ApartmentIcon, DirectionsCarIcon, GrassIcon } from '@/components'

export const collateralIconByTypeMap: Record<CollateralType, IconName> = {
  carLoan: () => <DirectionsCarIcon />,
  mortgage: () => <ApartmentIcon />,
  agriculturalLoan: () => <GrassIcon />,
}
