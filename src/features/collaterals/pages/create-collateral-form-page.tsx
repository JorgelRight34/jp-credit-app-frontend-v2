import { collateralsPermissionProvider } from '../lib/config/permissionsProvider'
import { collateralsBreadcrumb } from '../lib/config/breadcrumbs'
import { CreateFormPageLayout } from '@/components'
import CreateCollateralForm from '../components/create-collateral-form'

const CreateCollateralFormPage = () => {
  return (
    <CreateFormPageLayout
      title="Garantía"
      breadcrumbs={[collateralsBreadcrumb]}
      permissionProvider={collateralsPermissionProvider}
    >
      <CreateCollateralForm />
    </CreateFormPageLayout>
  )
}

export default CreateCollateralFormPage
