import { collateralsPermissionProvider } from '../lib/config/permissionsProvider'
import {
  collateralsBreadcrumb,
  createCollateralBreadcrumb,
} from '../lib/config/breadcrumbs'
import CollateralForm from '../components/collateral-form'
import type { Collateral } from '../models/collateral'
import { FormPageLayout } from '@/components'

interface CollateralFormPageProps {
  collateral?: Collateral
}

const CollateralFormPage = ({ collateral }: CollateralFormPageProps) => {
  return (
    <FormPageLayout
      title={collateral ? collateral.title : 'garantía'}
      mode={collateral ? 'edit' : 'create'}
      breadcrumbs={
        collateral
          ? [collateralsBreadcrumb, createCollateralBreadcrumb(collateral)]
          : [collateralsBreadcrumb]
      }
      permissionProvider={collateralsPermissionProvider}
    >
      <CollateralForm collateral={collateral} />
    </FormPageLayout>
  )
}

export default CollateralFormPage
