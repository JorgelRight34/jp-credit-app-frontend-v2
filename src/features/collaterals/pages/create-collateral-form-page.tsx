import { collateralsPermissionProvider } from '../lib/config/permissionsProvider'
import { CreateFormPageLayout } from '@/components'
import CreateCollateralForm from '../components/create-collateral-form'
import { collateralsBreadcrumb } from './collateral-page'

const CreateCollateralFormPage = () => {
  return (
    <CreateFormPageLayout
      title="Crear garantía"
      breadcrumbs={[collateralsBreadcrumb]}
      permissionProvider={collateralsPermissionProvider}
    >
      <CreateCollateralForm />
    </CreateFormPageLayout>
  )
}

export default CreateCollateralFormPage
