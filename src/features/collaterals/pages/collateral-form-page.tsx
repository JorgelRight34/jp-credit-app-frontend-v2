import { collateralsPermissionProvider } from '../lib/config/permissionsProvider'
import { collateralsBreadcrumb } from '../lib/config/breadcrumbs'
import CollateralForm from '../components/collateral-form'
import { FormPageLayout } from '@/components'

const CollateralFormPage = () => {
  return (
    <FormPageLayout
      title="Crear garantía"
      breadcrumbs={[collateralsBreadcrumb]}
      permissionProvider={collateralsPermissionProvider}
    >
      <CollateralForm />
    </FormPageLayout>
  )
}

export default CollateralFormPage
