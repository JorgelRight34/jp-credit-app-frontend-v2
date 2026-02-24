import { collateralsPermissionProvider } from '../lib/config/permissionsProvider'
import {
  collateralsBreadcrumb,
  buildCollateralBreadcrumb,
} from '../lib/config/breadcrumbs'
import type { Collateral } from '../models/collateral'
import {
  ConfirmationModal,
  ConfirmationModalRef,
  buildPageLayoutDeleteOption,
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
        buildCollateralBreadcrumb(collateral),
      ]}
      permissionProvider={collateralsPermissionProvider}
      options={[
        buildPageLayoutDeleteOption({
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
        confirmationMessage="Deseo borrar esta garantía"
        ref={modalRef}
        onConfirm={() => deleteCollateral(collateral.id)}
      />
    </EditFormPageLayout>
  )
}

export default EditCollateralFormPage
