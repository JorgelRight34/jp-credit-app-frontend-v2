import { collateralsPermissionProvider } from '../lib/config/permissionsProvider'
import {
  collateralsBreadcrumb,
  createCollateralBreadcrumb,
} from '../lib/config/breadcrumbs'
import type { Collateral } from '../models/collateral'
import {
  ConfirmationModal,
  ConfirmationModalRef,
  createPageLayoutDeleteOption,
  EditFormPageLayout,
} from '@/components'
import EditCollateralForm from '../components/edit-collateral-form'
import { deleteCollateral } from '../services/collateralClient'
import { useRef } from 'react'

interface EditCollateralFormPageProps {
  collateral: Collateral
}

const EditCollateralFormPage = ({
  collateral,
}: EditCollateralFormPageProps) => {
  const modalRef = useRef<ConfirmationModalRef>(null)

  return (
    <EditFormPageLayout
      title={collateral.title}
      breadcrumbs={[
        collateralsBreadcrumb,
        createCollateralBreadcrumb(collateral),
      ]}
      permissionProvider={collateralsPermissionProvider}
      options={[
        createPageLayoutDeleteOption({
          onClick: () => modalRef.current?.show(),
          disabled: collateral.isActive === false,
          tooltip:
            'No puede eliminar una garantía que ha sido usada para pago o esté inactiva',
        }),
      ]}
    >
      <EditCollateralForm collateral={collateral} />
      <ConfirmationModal
        title="Borrar garantía"
        ref={modalRef}
        confirmationMessage="Deseo borrar esta garantía"
        onConfirm={() => deleteCollateral(collateral.id)}
      />
    </EditFormPageLayout>
  )
}

export default EditCollateralFormPage
