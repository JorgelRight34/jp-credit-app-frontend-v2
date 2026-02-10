import { collateralsPermissionProvider } from '../lib/config/permissionsProvider'
import {
  collateralsBreadcrumb,
  createCollateralBreadcrumb,
} from '../lib/config/breadcrumbs'
import type { Collateral } from '../models/collateral'
import { EditFormPageLayout } from '@/components'
import EditCollateralForm from '../components/edit-collateral-form'
import { deleteCollateral } from '../services/collateralClient'

interface EditCollateralFormPageProps {
  collateral: Collateral
}

const EditCollateralFormPage = ({
  collateral,
}: EditCollateralFormPageProps) => {
  return (
    <EditFormPageLayout
      title={collateral.title}
      breadcrumbs={[
        collateralsBreadcrumb,
        createCollateralBreadcrumb(collateral),
      ]}
      permissionProvider={collateralsPermissionProvider}
      onDelete={() => deleteCollateral(collateral.id)}
    >
      <EditCollateralForm collateral={collateral} />
    </EditFormPageLayout>
  )
}

export default EditCollateralFormPage
