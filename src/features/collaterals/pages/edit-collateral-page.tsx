import { collateralsPermissionProvider } from '../lib/config/permissionsProvider'
import type { Collateral } from '../models/collateral'
import {
  EditFormPageLayout,
  buildPageLayoutConfirmationModalOption,
} from '@/components'
import EditCollateralForm from '../components/edit-collateral-form'
import { deleteCollateral } from '../services/collateralClient'
import {
  buildCollateralBreadcrumb,
  collateralsBreadcrumb,
} from './collateral-page'

const EditCollateralPage = ({ collateral }: { collateral: Collateral }) => {
  return (
    <EditFormPageLayout
      title={collateral.title}
      breadcrumbs={[
        collateralsBreadcrumb,
        buildCollateralBreadcrumb(collateral),
      ]}
      permissionProvider={collateralsPermissionProvider}
      options={[
        buildPageLayoutConfirmationModalOption(
          {
            disabled: collateral.isActive === false,
            tooltip:
              'No puede eliminar una garantía que ha sido usada para pago o esté inactiva',
          },
          {
            header: 'Borrar garantía',
            confirmationMessage: 'Deseo borrar esta garantía',
            onConfirm: () => deleteCollateral(collateral.id),
          },
        ),
      ]}
    >
      <EditCollateralForm collateral={collateral} />
    </EditFormPageLayout>
  )
}

export default EditCollateralPage
