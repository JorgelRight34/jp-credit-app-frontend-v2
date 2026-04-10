import { collateralsPermissionProvider } from '../lib/config/permissionsProvider'
import { CreateFormPageLayout } from '@/components'
import CreateCollateralForm from '../components/create-collateral-form'
import { PropsWithProjectId } from '@/features/projects'
import { collateralsBreadcrumb } from './collaterals-page'

const CreateCollateralPage = ({ projectId }: PropsWithProjectId) => (
  <CreateFormPageLayout
    title="Crear garantía"
    breadcrumbs={[collateralsBreadcrumb]}
    permissionProvider={collateralsPermissionProvider}
  >
    <CreateCollateralForm projectId={projectId} />
  </CreateFormPageLayout>
)

export default CreateCollateralPage
