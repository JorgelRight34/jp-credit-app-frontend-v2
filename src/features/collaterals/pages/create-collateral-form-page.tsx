import { collateralsPermissionProvider } from '../lib/config/permissionsProvider'
import { CreateFormPageLayout } from '@/components'
import CreateCollateralForm from '../components/create-collateral-form'
import { collateralsBreadcrumb } from './collateral-page'
import { PropsWithProjectId } from '@/features/projects'

const CreateCollateralFormPage = ({ projectId }: PropsWithProjectId) => {
  return (
    <CreateFormPageLayout
      title="Crear garantía"
      breadcrumbs={[collateralsBreadcrumb]}
      permissionProvider={collateralsPermissionProvider}
    >
      <CreateCollateralForm projectId={projectId} />
    </CreateFormPageLayout>
  )
}

export default CreateCollateralFormPage
