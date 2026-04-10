import { collateralsPermissionProvider } from '../lib/config/permissionsProvider'
import type { PropsWithCollateral } from '../models/collateral'
import { EditFormPageLayout, buildPageLayoutDeleteOption } from '@/components'
import EditCollateralForm from '../components/edit-collateral-form'
import { buildCollateralBreadcrumb } from './collateral-page'
import { collateralsBreadcrumb } from './collaterals-page'

const EditCollateralPage = ({ collateral }: PropsWithCollateral) => (
  <EditFormPageLayout
    title={collateral.title}
    breadcrumbs={[collateralsBreadcrumb, buildCollateralBreadcrumb(collateral)]}
    permissionProvider={collateralsPermissionProvider}
    options={[
      buildPageLayoutDeleteOption({
        disabled: collateral.isActive,
        tooltip: 'No puede eliminar una garantía que está activa.',
        to: '/collaterals/$id/delete',
        params: { id: collateral.id.toString() },
      }),
    ]}
  >
    <EditCollateralForm collateral={collateral} />
  </EditFormPageLayout>
)

export default EditCollateralPage
